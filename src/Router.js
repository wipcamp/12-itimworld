import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import Login from './components/Login'
import Profile from './components/Profile'
import Major from './components/Major'
import Questions from "./components/Questions";

export default class Index extends React.Component {

  render() {
    return (
      <Router>
        <Link to="/profile" >1</Link>
        <Link to="/major" >2</Link>
        <Link to="/questions" >3</Link>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/major" component={Major} />
          <Route exact path="/questions" component={Questions} />
        </Switch>
      </Router>
    )
  }
}

