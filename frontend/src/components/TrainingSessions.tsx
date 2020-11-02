import React, { Component } from 'react'
import Auth from '../auth/Auth'
import { Segment, Card, Button } from 'semantic-ui-react'
import { Session, SessionRequest } from '../types/trainingData'
import { SessionSegment } from './SessionSegment'
import{ AddTrainingSession } from './popups/AddTrainingSession'
import { createTrainingSession } from '../api/trainingplan-api'

const session1: Session = {
    sessionId: '1',
    name: 'Leg Day',
    date: '2020-10-10',
    description: 'Squats 10 reps, Deadlifts 100 KG 5x5',
    attachmentUrl: ''
}

const session2: Session = {
    sessionId: '2',
    name: 'back day',
    date: '2020-10-15',
    description: 'Squats 20 reps',
    attachmentUrl: ''
}

export interface componentProps {
    auth: Auth
  }
  
export interface AppState {
    Sessions: Session[]
    showPopupNewTrainingPlan: boolean
}

export class TrainingSessions extends Component<componentProps, AppState> {

    state: AppState = {
        Sessions: [
            session1,
            session2
        ],
        showPopupNewTrainingPlan: false
    }

    constructor(props: componentProps) {
        super(props)
    }

    async onFileUpload(url:string, id: string){
        this.setState({
            Sessions: this.state.Sessions.map(item => {
                if (id === item.sessionId) {
                  return { ...item, attachmentUrl: url }
                }
                return item;
              })
        })
    }

    toggleAddSession() {
        this.setState({
            showPopupNewTrainingPlan: !this.state.showPopupNewTrainingPlan,
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
            showPopupNewTrainingPlan: !this.state.showPopupNewTrainingPlan
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
                        onUpload = {this.onFileUpload.bind(this)}>
                        </SessionSegment>
                    )}         
                </Card.Group>
            </Segment>  

            {this.state.showPopupNewTrainingPlan ? 
            <AddTrainingSession 
                active= {this.state.showPopupNewTrainingPlan} 
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