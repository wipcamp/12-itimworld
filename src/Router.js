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

export default class Index extends React.Component {

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/major" component={Major} />
          <Route exact path="/questions" component={Questions} />
          <Route exact path="/preview" component={Preview} />
        </Switch>
      </Router>
    )
  }
}

