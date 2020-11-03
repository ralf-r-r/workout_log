import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { NotFound } from './components/NotFound'
import { NavBar } from './components/NavBar'
import {TrainingSessions} from './components/TrainingSessions'
import { Welcome } from './components/Welcome'
export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {

  render() {
    return (
      <div>
        <Segment style={{ padding: '4em 1em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateCurrentPage() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return (
              <div>
                {this.props.auth.isAuthenticated() ? 
                <div>
                <NavBar auth={this.props.auth} />
                <TrainingSessions auth={this.props.auth} />
                </div>
                :
                <div>
                <NavBar auth={this.props.auth} />
                <Welcome ></Welcome>
                </div>
                }
              </div> 
            )
          }}
        />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
