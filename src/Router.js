import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from 'styled-components'

import { Authentication } from './context/Authentication-Context'
import Navbar from './components/Core/Navbar'
import Login from './components/Login'
import Menu from './components/Menu'
import Profile from './components/Profile'
import Major from './components/Major'
import Questions from "./components/Questions"
import Preview from "./components/Preview"
import Success from './components/Success'
import Edit from './components/Edit'
import General from './components/General'
import Document from './components/Document'

const Mountain = styled.div`
  background-image:url('/img/mountain.png');
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-size:contain;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 30px;
`

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
          <Navbar />
          <Switch>
            <Route path="/login" >
              <Mountain>
                <Login callbackFromRouter={this.myCallback} />
              </Mountain>
            </Route>
            <PrivateRoute path="/profile">
              <Mountain>
                <Profile />
              </Mountain>
            </PrivateRoute>
            <PrivateRoute path="/general">
              <Mountain> 
                <General />
              </Mountain>
            </PrivateRoute>
            <PrivateRoute path="/major">
              <Major />
            </PrivateRoute>
            <PrivateRoute path="/menu">
              <Menu />
            </PrivateRoute>
            <PrivateRoute path="/document">
              <Document />
            </PrivateRoute>
            <PrivateRoute path="/questions">
              <Mountain>
                <Questions />
              </Mountain>
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

