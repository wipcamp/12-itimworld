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
`

const cookies = new Cookies()

const PrivateRoute = ({ condit, children, ...rest }) => {
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
                  locationNow === '/term' || locationNow === '/edit' ?
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

const MenuRoute = (props) => {
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
        (cookies.get('token') !== undefined && cookies.get('token') !== null) && !(props.condit) ? (
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

const ProfileRoute = (props) => {
  console.log(props.condit)
  return (
    <React.Fragment>
      {
        (cookies.get('token') !== undefined && cookies.get('token') !== null) ?
          !props.condit ? (
            <Mountain>
              <Profile />
            </Mountain>
          ) : (
              <Redirect
                to={{
                  pathname: "/menu",
                  state: { from: locationNow }
                }}
              />
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

const MajorRoute = (props) => {
  console.log(props.condit)
  return (
    <React.Fragment>
      {
        (cookies.get('token') !== undefined && cookies.get('token') !== null) ?
          props.majorStatus ?
            props.condit === null ? (
              <Major />
            ) : (
                <Redirect
                  to={{
                    pathname: "/questions",
                    state: { from: locationNow }
                  }}
                />
              )
            : (
              <Redirect
                to={{
                  pathname: "/major",
                  state: { from: locationNow }
                }}
              />
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

  state = {
    term: false,
    agree: false,
    profile: false,
    majorStatus: false,
    major: null
  }

  async componentDidMount() {
    await this.getUser();
  }

  getUser = async () => {
    await UserService.getMe()
      .then((promise) => {
        const response = promise.data;
        if (response.success) {
          this.setState({
            term: response.data[0].userStatus.accepted,
            agree: response.data[0].userStatus.acceptedStoreData,
            profile: response.data[0].userStatus.registered,
            majorStatus: response.data[0].userStatus.majorAnswered,
            major: response.data[0].major
          })
        } else {
          this.setState({ errorLoad: true })
        }
      })
      .catch(() => {
        this.setState({ errorLoad: true })
      })
  }

  render() {
    return (
      <Router>

        <Switch>
          <Route path="/login" >
            <Mountain>
              <Login />
            </Mountain>
          </Route>
          <MenuObjRoute path="/term" condit={this.state.term}>
            <Mountain>
              <Term />
            </Mountain>
          </MenuObjRoute>
          <MenuObjRoute path="/agreement" condit={this.state.agree}>
            <Mountain>
              <Agreement />
            </Mountain>
          </MenuObjRoute>
          <ProfileRoute path="/profile" condit={this.state.profile} />
          {/* <Mountain>
              <Profile />
            </Mountain>
          </PrivateRoute> */}
          <PrivateRoute path="/general">
            <Mountain>
              <General />
            </Mountain>
          </PrivateRoute>
          <MajorRoute path="/major" condit={this.state.major !== null} majorStatus={this.state.majorStatus} />
          {/* </MajorRoute> */}
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


