import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Navbar from './components/Core/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Major from './components/Major'
import Questions from "./components/Questions"
import Preview from "./components/Preview"
import Success from './components/Success'
import Edit from './components/Edit'
import General from './components/General'

export default class Index extends React.Component {

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/general" component={General} />
          <Route exact path="/major" component={Major} />
          <Route exact path="/questions" component={Questions} />
          <Route exact path="/preview" component={Preview} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/edit" component={Edit} />
        </Switch>
      </Router>
    )
  }
}

