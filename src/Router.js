import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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

const { cookies } = this.props;

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
            {console.log(isAuthenticated)}
          </React.Fragment>
        )
      }
    </Authentication.Consumer>
  );
}

class Index extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  state = {
    wipId: null,
    user: false,
    isAuthenticated: false,
    loginObj:null,
    name: cookies.get('Auth')
  }
  
  componentDidMount(){
    if(this.state.loginObj !== null){
      this.changeLineStatus()
    }
  }

  changeAuthen = (auth) => {
      console.log('changeAuthen')
      this.setState({
        isAuthenticated: auth
      })
  }

  // changeLineStatus = (loginObj , auth) => {
  //     console.log("login")
  //     console.log(loginObj)
  //     this.setState({
  //       loginObj: loginObj
  //     })
     
  //     this.changeAuthen(auth)
  // }

  render() {
    return (
      <Authentication.Provider value={{
        isAuthenticated: this.state.isAuthenticated,
        changeAuthen: this.changeAuthen
      }}>
          <Router>
            <Navbar />
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
      </Authentication.Provider>
    )
  }
}

export default withCookies(Index)

