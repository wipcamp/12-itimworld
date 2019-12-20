import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import Profile from './components/Profile'
import Major from './components/Major'

export default class Index extends React.Component {

  render() {
    return (
      <Router>
        <Link to="/" >1</Link>
        <Link to="/major" >2</Link>
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/major" component={Major} />
        </Switch>
      </Router>
    )
  }
}

