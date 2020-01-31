import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Authentication, LineCheck } from './context/Authentication-Context'
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
    isAuthenticated: false,
    loginObj:null
  }

  componentDidMount() {
    // if (!this.state.isAuthenticated) {
    //     this.changeAuthen()
    // }
  }

  changeAuthen = () => {
    if(this.state.loginObj !== null){
      console.log('changeAuthen')
      this.setState({
        isAuthenticated: true
      })
    }
  }

  changeLineStatus = (loginObj) => {
    console.log(loginObj)
    this.setState({
      loginObj: loginObj
    })
    this.changeAuthen()
  }

  render() {
    return (
      <Authentication.Provider value={{
        isAuthenticated: this.state.isAuthenticated,
        changeAuthen: this.changeAuthen
      }}>
        <LineCheck.Provider value={{
          loginObj: this.state.loginObj,
          changeLineStatus: this.changeLineStatus
        }}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/login" >
                <Login changeLineStatusFromRouter={this.changeLineStatus} />
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
              <PrivateRoute path="/menu">
                <Menu />
              </PrivateRoute>
              <PrivateRoute path="/document">
                {/* <Menu /> */}
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
        </LineCheck.Provider>
      </Authentication.Provider>
    )
  }
}

