import * as React from 'react'
import Auth from '../../auth/Auth'
import { DimmerTemplate } from './DimmerTemplate'
import {Button } from 'semantic-ui-react'

interface ComponentProps {
    active: boolean
    onCancel: any
    onDelete: any
    sessionId: string
    auth: Auth
}

interface LogInState {}

export class DeleteSession extends React.PureComponent<ComponentProps, LogInState> {

  render() {
    return (
        <div>
        <DimmerTemplate active={this.props.active}>
                <h4 style={{ color: 'black' }}> Do you want to delete the session ?</h4>
                <Button type='submit' onClick={this.props.onCancel} color='grey'> Cancel </Button>
                <Button type='submit' onClick={this.props.onDelete} 
                data-sessionid={this.props.sessionId} color='red'> Delete </Button>
        </DimmerTemplate>
         </div>
    )
  }
}
