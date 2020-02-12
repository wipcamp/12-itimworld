import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from 'universal-cookie';

import UserService from './services/UserService'

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

const cookies = new Cookies()

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={({ location }) =>
          (cookies.get('token') !== undefined && cookies.get('token') !== null)? (
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
      {console.log("Auth" + (cookies.get('token') !== undefined && cookies.get('token') !== null))}
    </React.Fragment>
  )
}

export default class Index extends React.Component {

  state = {
    wipId: null,
    user: false,
    isAuthenticated: false
  }
  
  componentDidMount(){
    if ((cookies.get('token') !== undefined || cookies.get('token') !== null) && !this.state.isAuthenticated ){
      console.log('token')
      console.log(cookies.get('token'))
      this.setState({
        isAuthenticated: true
      })
    }
  }

  render() {
    return (
      <Router>
        <Navbar isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route path="/login" >
            <Login />
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
    )
  }
}


