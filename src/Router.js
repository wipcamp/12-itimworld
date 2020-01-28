import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Authentication } from './context/Authentication-Context'
import Navbar from './components/Core/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Major from './components/Major'
import Questions from "./components/Questions"
import Preview from "./components/Preview"
import Success from './components/Success'
import Edit from './components/Edit'
import General from './components/General'

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Authentication.Consumer>
      {
        ({ isAuthenticated }) => (
          <React.Fragment>
            <Route
              {...rest}
              render={({ location }) =>
                isAuthenticated ? (
                  children
                ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: location }
                      }}
                    />
                  )
              }
            />
          </React.Fragment>
        )
      }
    </Authentication.Consumer>
  );
}

export default class Index extends React.Component {

  state = {
    wipId: null,
    user: false,
    isAuthenticated: false
  }

  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.myCallback()
    }
  }

  myCall = (wipId) => {
    this.setState({
      wipId: wipId
    })
  }

  myCallback = (isAuthenticated) => {
    this.setState({
      isAuthenticated: isAuthenticated
    })
  }

  render() {
    return (
      <Authentication.Provider value={{
        isAuthenticated : this.state.isAuthenticated,
        changeAuthen: this.myCallback
      }}>
        <Router>
          <Switch>
            {/* <Navbar callbackFromRouter={this.myCall} /> */}
            {/* <Route exact path="/" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/general" component={General} />
            <Route exact path="/major" component={Major} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/preview" component={Preview} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/edit" component={Edit} /> */}
            <Route path="/login" >
              <Login callbackFromRouter={this.myCallback} />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/general">
              <General />
            </PrivateRoute>
            <PrivateRoute path="/major">
              <Major />
            </PrivateRoute>
            <PrivateRoute path="/questions">
              <Questions />
            </PrivateRoute>
            <PrivateRoute path="/preview">
              <Preview />
            </PrivateRoute>
            <PrivateRoute path="/success">
              <Success />
            </PrivateRoute>
            <PrivateRoute path="/edit">
              <Edit />
            </PrivateRoute>
            <PrivateRoute path="*" />
          </Switch>
        </Router>
      </Authentication.Provider>
    )
  }
}

