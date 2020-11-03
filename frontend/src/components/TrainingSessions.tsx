import React, { Component } from 'react'
import Auth from '../auth/Auth'
import { Segment, Card, Button } from 'semantic-ui-react'
import { Session, SessionRequest } from '../types/trainingData'
import { SessionSegment } from './SessionSegment'
import{ AddTrainingSession } from './popups/AddTrainingSession'
import { createTrainingSession, getSessions, deleteTrainingSession, updateSession } from '../api/trainingplan-api'


export interface componentProps {
    auth: Auth
  }
  
export interface AppState {
    Sessions: Session[]
    showPopupNewTrainingSession: boolean
}

export class TrainingSessions extends Component<componentProps, AppState> {

    state: AppState = {
        Sessions: [],
        showPopupNewTrainingSession: false
    }

    constructor(props: componentProps) {
        super(props)
        this.onDeleteSession.bind(this)
        this.onEditSession.bind(this)
    }

    async componentDidMount() {
        try {
          const sessionItems = await getSessions(this.props.auth.getIdToken())
          this.setState({
            Sessions: sessionItems,
            showPopupNewTrainingSession: false
          })
        } catch (e) {
          alert(`Failed to fetch todos: ${e.message}`)
        }
      }


    async onFileUpload(url:string, id: string){
        this.setState({
            Sessions: this.state.Sessions.map(item => {
                if (id === item.sessionId) {
                  return { ...item, attachmentUrl: url }
                }
                return item
              })
        })
    }

    async onDeleteSession(event: any){
        const sessionId: string = event.target.dataset.sessionid
        await deleteTrainingSession(this.props.auth.getIdToken(), sessionId)
        this.setState({Sessions: this.state.Sessions.filter(function(sess:Session) { 
            return sess.sessionId !== sessionId
            })
        }) 
    }

    async onEditSession(event:any){
        const sessionId:string = event.target.dataset.sessionid
        const name: string = event.target.dataset.name
        const date: string = event.target.dataset.date
        const description: string = event.target.dataset.description
        
        const newSessionRequest: SessionRequest = {
            name: name,
            date: date,
            description: description
        }

        await updateSession(this.props.auth.getIdToken(), sessionId,newSessionRequest)

        this.setState({
            Sessions: this.state.Sessions.map(item => {
                if (sessionId === item.sessionId) {
                  return { 
                    sessionId: item.sessionId,
                    name: name,
                    date: date,
                    description: description,
                    attachmentUrl: item.attachmentUrl
                  }
                }
                return item
              })
        })
    }

    toggleAddSession() {
        this.setState({
            showPopupNewTrainingSession: !this.state.showPopupNewTrainingSession,
        })
    }

    async addTrainingSession(event: any) {
        const tempList: Session[] = this.state.Sessions
        const newSessionRequest: SessionRequest = {
            name: event.target.dataset.name,
            date: event.target.dataset.date,
            description: event.target.dataset.description
        }
        const newSession = await createTrainingSession(this.props.auth.getIdToken(), newSessionRequest)

        tempList.push(newSession)
        this.setState({
            Sessions: tempList,
            showPopupNewTrainingSession: !this.state.showPopupNewTrainingSession
        })
    }

    render() {
        return (
            <div style = {{marginTop: '5em'}}>
            <Segment>
                <Button basic color='purple' onClick = {this.toggleAddSession.bind(this)}>
                    Add Training Session
                </Button>
            </Segment>
            <Segment>
                <Card.Group>
                    {this.state.Sessions.map((sess) => 
                        <SessionSegment 
                        auth = {this.props.auth}
                        session = {sess} 
                        onUpload = {this.onFileUpload.bind(this)}
                        onDelete = {this.onDeleteSession.bind(this)}
                        onEdit = {this.onEditSession.bind(this)}>
                        </SessionSegment>
                    )}         
                </Card.Group>
            </Segment>  

            {this.state.showPopupNewTrainingSession ? 
            <AddTrainingSession 
                active= {this.state.showPopupNewTrainingSession} 
                onClick= {this.toggleAddSession.bind(this)}
                auth = {this.props.auth}
                updateHandler = {this.addTrainingSession.bind(this)}
            >
            </AddTrainingSession>
            : null
          }  

            </div> 
        )
    }
}