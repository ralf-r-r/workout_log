import * as React from 'react'
import {Dimmer } from 'semantic-ui-react'

interface LogInProps {
  active: boolean
}

interface LogInState {}

export class DimmerTemplate extends React.PureComponent<LogInProps, LogInState> {

  render() {
    return (
        <Dimmer active={this.props.active} page inverted>
            {this.props.children}
        </Dimmer>
    )
  }
}
