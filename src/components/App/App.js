import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Home from './../Home/Home'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Tasks from '../tasks/tasks'
import TaskCreate from '../tasks/taskCreate'
import Task from '../tasks/task'
import TaskUpdate from '../tasks/taskEdit'
import SprintCreate from '../sprints/SprintCreate'
import SprintIndex from '../sprints/SprintIndex'
import SprintShow from '../sprints/SprintShow'
import SprintUpdate from '../sprints/SprintUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          <Route exact path='/' component={Home}/>

          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/tasks' render={() => (
            <Tasks msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/task-show/:taskId' render={({ match }) => (
            <Task msgAlert={this.msgAlert} user={user} match={match}/>
          )} />

          <AuthenticatedRoute user={user} path='/task-create' render={({ match }) => (
            <TaskCreate msgAlert={this.msgAlert} match={match} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/task-update/:taskId' render={({ match, history }) => (
            <TaskUpdate match={match} history={history} user={user} msgAlert={this.msgAlert} />
          )} />

          <AuthenticatedRoute user={user} path='/sprint-create' render={({ match }) => (
            <SprintCreate msgAlert={this.msgAlert} match={match} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/sprint-show/:sprintId' render={({ match }) => (
            <SprintShow msgAlert={this.msgAlert} user={user} match={match}/>
          )} />

          <AuthenticatedRoute user={user} path='/sprints' render={() => (
            <SprintIndex msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/sprint-update/:sprintId' render={({ match, history }) => (
            <SprintUpdate match={match} history={history} user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
