import * as React from 'react'

import { DimmerTemplate } from './DimmerTemplate'
import {Form, Button,  } from 'semantic-ui-react'
import { Session } from '../../types/trainingData'
import Auth from '../../auth/Auth'

interface ComponentProps {
    active: boolean
    onClick: any
    updateHandler: any
    auth: Auth
}


export class AddTrainingSession extends React.PureComponent<ComponentProps, Session> {

    state: Session = {
        name: ' ',
        date: ' ' ,
        description: '  ',
        attachmentUrl: ' ',
        sessionId: ' '
    }

    constructor(props: ComponentProps) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    }

    handleNameChange(event:any){
        this.setState({
            name: event.target.value
         })
    }

    handleDateChange(event:any){
        this.setState({
            date: event.target.value
         })
    }

    handleDescriptionChange(event:any){
        this.setState({
            description: event.target.value
         })
    }
    
    render() {
    return (
        <DimmerTemplate active={this.props.active}>
            <Form >
            <Form.Field>
                <label>Session name</label>
                <input placeholder='Squat routine' onChange={this.handleNameChange.bind(this)} />
            </Form.Field>
            <Form.Field>
                <label>Date</label>
                <input placeholder='Squat routine' onChange={this.handleDateChange.bind(this)} />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <input placeholder='Squat routine' onChange={this.handleDescriptionChange.bind(this)} />
            </Form.Field>

            <Button type='submit' onClick={this.props.onClick} color='red'> Cancel </Button>
            <Button type='submit' 
            onClick={this.props.updateHandler} 
            color='green' 
            data-name={this.state.name}
            data-date={this.state.date}
            data-description={this.state.description}   > Create </Button>
            </Form>
        </DimmerTemplate>
    )
  }
}
