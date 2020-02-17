import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from 'universal-cookie';
import styled from 'styled-components'

import UserService from './services/UserService'

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

const locationNow = window.location.pathname

const Mountain = styled.div`
  background-image:url('/img/mountain.png');
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-size:contain;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 30px;
`

const cookies = new Cookies()

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={({ location }) =>
          (cookies.get('token') !== undefined && cookies.get('token') !== null)? (
          // true ? (
            <React.Fragment>
            {
                locationNow === '/menu' || locationNow === '/profile' || 
                  locationNow === '/general' || locationNow === '/major' ||
                  locationNow === '/document' ? 
              children
              :
              <Redirect
                to={{
                  pathname: "/menu",
                  state: { from: locationNow }
                }}
              />
            }
            </React.Fragment>
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

const MenuRoute = () => {
  return(
    <React.Fragment>
      {
        (cookies.get('token') !== undefined && cookies.get('token') !== null)? (
        // true ? (
          <Menu />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: locationNow }
              }}
            />
          )
      }
    </React.Fragment>
  )
}
export default class Index extends React.Component {

  state = {
    wipId: null,
    user: false,
    isAuthenticated: false
  }
  
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" >
            <Mountain>
              <Login />
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
          <MenuRoute path="/menu" />
            {/* <Menu />
          </MenuRoute> */}
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
    )
  }
}


