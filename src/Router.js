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
import Star from './components/Core/Star';

const Mountain = styled.div`
  background-image:url('/img/mountain.png') , url('/img/Star/zodiac1.png'), url('/img/Star/zodiac2.png'), url('/img/Star/zodiac3.png') , url('/img/Star/star1.png'), url('/img/Star/star2.png'), url('/img/Star/star3.png');
  background-repeat: no-repeat;
  background-position: center bottom , 5% 20% , 15% 2% , 90% 10% , 10% 6% ,  87% 0% , 100% 13%;
  background-size:contain , 5% , 8% , 5% , 14% , 25% , 15% ;
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
          // (cookies.get('token') !== undefined && cookies.get('token') !== null)? (
          true ? (
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
    )
  }
}


