import * as React from 'react'
import Auth from '../auth/Auth'
import { Button } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState {}

export class LogInButton extends React.PureComponent<LogInProps, LogInState> {
  constructor(props: LogInProps) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }


  render() {
    if (this.props.auth.isAuthenticated()) {
    return (
      <div>
        <Button onClick={this.handleLogout} size="huge" color="violet">
          Logout
        </Button>
      </div>
    )
    }else{
      return (
        <div>
          <Button onClick={this.handleLogin} size="huge" color="violet">
            Login
          </Button>
        </div>
      )
    }
    }
}