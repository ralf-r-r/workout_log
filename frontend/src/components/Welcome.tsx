import * as React from 'react'
import Auth from '../auth/Auth'
import {Message } from 'semantic-ui-react'
interface LogInProps {
}

interface LogInState {}

export class Welcome extends React.PureComponent<LogInProps, LogInState> {
  constructor(props: LogInProps) {
    super(props)
  }

  render() {
      return(
        <Message style = {{marginTop: '10em' }} color = 'violet'>
        <Message.Header>Welcome to the workout tracker</Message.Header>
        <p>
          Please login to view your workout plans
        </p>
      </Message>

      )
}
}