import React, { Component } from 'react'
import Auth from '../auth/Auth'
import { Card, Button, Image } from 'semantic-ui-react'
import { Session } from '../types/trainingData'
import{ UploadFile } from './popups/UploadFile'
import{ DeleteSession } from './popups/DeleteSession'
import{ EditSession } from './popups/EditSession'

export interface componentProps {
    auth: Auth
    session: Session
    onUpload: any
    onDelete: any
    onEdit: any
  }
  
export interface componentState {
  showPopupUploadFile: boolean
  showDeleteSession: boolean
  showEditSession: boolean
}

export class SessionSegment extends Component<componentProps, componentState> {
  state: componentState = {
    showPopupUploadFile: false,
    showDeleteSession: false,
    showEditSession: false
  }
  constructor(props: componentProps) {
    super(props)
    this.toggleUploadFile = this.toggleUploadFile.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  } 

  toggleUploadFile() {
    this.setState({
        showPopupUploadFile: !this.state.showPopupUploadFile,
    })
  } 

  toggleEditSession() {
    this.setState({
      showEditSession: !this.state.showEditSession,
    })
  } 

  toggleDeleteSession() {
    this.setState({
      showDeleteSession: !this.state.showDeleteSession,
    })
  } 

  onDeleteHandler(event:any){
    this.setState({
      showDeleteSession: !this.state.showDeleteSession,
    })
    this.props.onDelete(event)
  }

    render(){
        return(
            <div style = {{marginTop: '0.5em', marginLeft: '0.5em', marginRight: '0.5em', marginBottom: '0.5em'}}>
            <Card  fluid>
            <Image  src= {this.props.session.attachmentUrl}
            style={{width: 'auto', height: '200px'}} ></Image>
            <Card.Content>
            <Card.Header>{this.props.session.name}</Card.Header>
            <Card.Meta>{this.props.session.date}</Card.Meta>
              <Card.Description>
                {this.props.session.description}
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui three buttons'>
                <Button basic color='green'  onClick = {this.toggleEditSession.bind(this)}>
                    Edit 
                </Button>
                <Button basic color='purple' onClick = {this.toggleUploadFile.bind(this)} >
                    Upload 
                </Button>
                <Button basic color='red' onClick = {this.onDeleteHandler.bind(this)}>
                    Delete 
                </Button>
                </div>
              </Card.Content>  
          </Card>

          {this.state.showPopupUploadFile ? 
            <UploadFile 
                active= {this.state.showPopupUploadFile} 
                onFileUpload = {this.props.onUpload}
                onClick= {this.toggleUploadFile.bind(this)}
                auth = {this.props.auth}
                sessionID = {this.props.session.sessionId}
            >
            </UploadFile>
            : null
          }  

        {this.state.showDeleteSession ? 
            <DeleteSession 
                active= {this.state.showDeleteSession} 
                onCancel= {this.toggleDeleteSession.bind(this)}
                onDelete = {this.props.onDelete}
                auth = {this.props.auth}
                sessionId = {this.props.session.sessionId}
            >
            </DeleteSession>
            : null
          }  

        {this.state.showEditSession ? 
            <EditSession 
                active= {this.state.showEditSession} 
                onClick = {this.toggleEditSession.bind(this)}
                updateHandler = {this.props.onEdit}
                auth = {this.props.auth}
                sessionId = {this.props.session.sessionId}
            >
            </EditSession>
            : null
          }  

          </div> 

        )
    }
}