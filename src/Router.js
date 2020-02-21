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

const MajorRoute = async (props) => {
  
  return (
    <MenuObjRoute condit={(await UserService.getMe().then( (response) => response.data.data[0].major))!== null}>
      <Route path={props.path} >
        <Major />
      </Route>
    </MenuObjRoute>
  )
}

const AgreeRoute = async (props) => {
  return (
    <MenuObjRoute condit={await UserService.getMe().then((response) => response.data.data[0].userStatus.accepted)}>
      <Route path={props.path}>
        <Mountain>
          <Agreement />
        </Mountain>
      </Route>
    </MenuObjRoute>
  )
}

const TermRoute = async (props) => {
    // try {
    //   let res = await axios.get('/posts');
    //   let posts = res.data;
    //   // this will re render the view with new data
    //   UserService.getMe().then((response) => response.data.data[0].userStatus.acceptedStoreData)
    // } catch (err) {
    //   console.log(err);
    // }

  let check = await UserService.getMe().then((response) => response.data.data[0].userStatus.acceptedStoreData)
  return (
    <React.Fragment>
      {
        (cookies.get('token') !== undefined && cookies.get('token') !== null) && check ? (
          <Mountain>
            <Term />
          </Mountain> 
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
    // <MenuObjRoute condit={await UserService.getMe().then((response) => response.data.data[0].userStatus.acceptedStoreData)}>
    //   <Route path={props.path}>
         
    //   </Route>
    // </MenuObjRoute>
  )
}
export default class Index extends React.Component {

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
          {/* <MenuObjRoute path="/term" condit={this.state.term}> */}
          {/* <MenuObjRoute path="/term" condit={this.state.term}>
            <Mountain>
              <Term />
            </Mountain>
          </MenuObjRoute> */}
          <TermRoute path="/term"  />
            {/* <Mountain>
              <Term />
            </Mountain>
          </TermRoute> */}
          <AgreeRoute path="/agreement"/>
          {/* <MenuObjRoute path="/agreement" condit={this.state.agree}>
            <Mountain>
              <Agreement />
            </Mountain>
          </MenuObjRoute> */}
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
          <MajorRoute path="/major"  />
          {/* </MajorRoute> */}
          {/* <MenuObjRoute path="/major" condit={this.state.major}>
            <Major />
          </MenuObjRoute> */}
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


