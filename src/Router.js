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
import Edit from './components/Edit'
import General from './components/General'
import Document from './components/Document'
import { Error } from './components/Core/Waiting'
import Agreement from './components/Agreement'
import Term from './components/Term'

const locationNow = window.location.pathname

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
          (cookies.get('token') !== undefined && cookies.get('token') !== null) ? (
            // true ? (
            <React.Fragment>
              {
                locationNow === '/menu' || locationNow === '/profile' ||
                  locationNow === '/general' || locationNow === '/major' ||
                  locationNow === '/document' || locationNow === '/agreement' ||
                  locationNow === '/term' ?
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
  return (
    <React.Fragment>
      {
        (cookies.get('token') !== undefined && cookies.get('token') !== null) ? (
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

const MenuObjRoute = (props) => {
  console.log(props.condit)
  return (
    <React.Fragment>
      {
        (cookies.get('token') !== undefined && cookies.get('token') !== null) && props.condit ? (
          props.children
        ) : (
            <Redirect
              to={{
                pathname: "/menu",
                state: { from: locationNow }
              }}
            />
          )
      }
    </React.Fragment>
  )
}

export default class Index extends React.Component {

  getUserService = async () => {
    return await UserService.getMe();
  }

  render() {
    return (
      <Router>
        {
          (cookies.get('token') !== undefined && cookies.get('token') !== null) && locationNow !== '/login' ?
            // true  && locationNow !== '/login' ?
            <Navbar /> :
            ''
        }
        <Switch>
          <Route path="/login" >
            <Mountain>
              <Login />
            </Mountain>
          </Route>
          <MenuObjRoute path="/term"
            condit={
              UserService.getMe().then((response) => response.data.data[0])
            }>
            <Mountain>
              <Term />
            </Mountain>
          </MenuObjRoute>
          {/* <TermRoute path="/term"  /> */}
            {/* <Mountain>
              <Term />
            </Mountain>
          </TermRoute> */}
          {/* <AgreeRoute path="/agreement" agree={this.state.agree} /> */}
          <MenuObjRoute path="/agreement" 
            condit={
              async () =>
                await UserService.getMe().then((response) => response.data.data[0].userStatus.acceptedStoreData)
            }>
            <Mountain>
              <Agreement />
            </Mountain>
          </MenuObjRoute>
            {/* <Mountain>
              <Agreement />
            </Mountain>
          </AgreeRoute> */}
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
          {/* <MajorRoute path="/major" major={this.state.major} /> */}
          {/* </MajorRoute> */}
          <MenuObjRoute path="/major" 
            condit={(
              async () =>
                await UserService.getMe().then((response) => response.data.data[0].major)
            ) !== null }>
            <Major />
          </MenuObjRoute>
          <MenuRoute path="/menu" />
          <PrivateRoute path="/document">
            <Mountain>
              <Document />
            </Mountain>
          </PrivateRoute>
          <PrivateRoute path="/questions">
            <Mountain>
              <Questions />
            </Mountain>
          </PrivateRoute>
          <PrivateRoute path="/edit">
            <Mountain>
              <Edit />
            </Mountain>
          </PrivateRoute>
          <PrivateRoute path="/error">
            <Error />
          </PrivateRoute>
          <PrivateRoute path="*" />
        </Switch>
      </Router>
    )
  }
}


