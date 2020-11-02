import * as React from 'react'
import {LogInButton} from './LogInButton'
import Auth from '../auth/Auth'
import { Menu } from 'semantic-ui-react'

interface LogInProps {
    auth: Auth
  }

interface LogInState {}

export class NavBar extends React.PureComponent<LogInProps, LogInState> {

  render() {
    return (
      <Menu fixed='top' color = "black" inverted>
          <Menu.Item>
            <div style = {{marginLeft:'5em'}}>
              <h2>Workout Tracker</h2>
            </div>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <LogInButton auth={this.props.auth}/>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
    )
  }
}
