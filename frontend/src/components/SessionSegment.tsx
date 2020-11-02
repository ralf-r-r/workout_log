import React, { Component } from 'react'
import Auth from '../auth/Auth'
import { Card, Button, Image } from 'semantic-ui-react'
import { Session } from '../types/trainingData'
import{ UploadFile } from './popups/UploadFile'

export interface componentProps {
    auth: Auth
    session: Session
    onUpload: any
  }
  
export interface componentState {
  showPopupUploadFile: boolean
}

export class SessionSegment extends Component<componentProps, componentState> {
  state: componentState = {
    showPopupUploadFile: false
  }
  constructor(props: componentProps) {
    super(props)
    this.toggleUploadFile = this.toggleUploadFile.bind(this)
  } 

  toggleUploadFile() {
    this.setState({
        showPopupUploadFile: !this.state.showPopupUploadFile,
    })
}
    render(){
        return(
            <div>
            <Card style = {{marginTop: '0.5em', marginLeft: '0.5em', marginRight: '0.5em', marginBottom: '0.5em'}}>
            <Image src={this.props.session.attachmentUrl} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{this.props.session.name} - {this.props.session.date}</Card.Header>
              <Card.Description>
                {this.props.session.description}
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui three buttons'>
                <Button basic color='green'  >
                    Edit 
                </Button>
                <Button basic color='purple' onClick = {this.toggleUploadFile.bind(this)} >
                    Upload 
                </Button>
                <Button basic color='red'>
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

          </div> 

        )
    }
}