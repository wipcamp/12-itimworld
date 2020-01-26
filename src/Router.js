import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { Authentication, isAuthenticated } from './context/Authentication-Context'
import Navbar from './components/Core/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Major from './components/Major'
import Questions from "./components/Questions"
import Preview from "./components/Preview"
import Success from './components/Success'
import Edit from './components/Edit'
import General from './components/General'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

const PrivateRoute = ({ children, ...rest }, props) => {
  return (
    <Authentication.Consumer>
      {
        ({ user, changeAuthen }) => (
          <React.Fragment>
            <Route
              {...rest}
              render={({ location }) =>
                user ? (
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
            {console.log(fakeAuth.isAuthenticated + " " + user)}
          </React.Fragment>
        )
      }
    </Authentication.Consumer>
  );
}

const LoginPage = (props) => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  }

  let myCallback = (isAuthenticated) => {
    // callbackFromRouter(isAuthenticated)
    fakeAuth.isAuthenticated = isAuthenticated
  }
  return (
    <Login callbackFromRouter={myCallback} login={login} />
  );
}

export default class Index extends React.Component {

  state = {
    wipId: null,
    user: false,
  }
  componentDidMount() {
    if (!fakeAuth.isAuthenticated ) {
      this.changeAuthen()
    }
    // console.log(fakeAuth.isAuthenticated)
  }

  componentDidUpdate() {
   
    // console.log(fakeAuth.isAuthenticated)
  }

  myCall = (wipId) => {
    this.setState({
      wipId: wipId
    })
  }

  changeAuthen = () => {
    console.log(2)
    this.setState({
      user: fakeAuth.isAuthenticated
    })
  }

  render() {
    const { user } = this.state
    return (
      <Authentication.Provider value={{
        user,
        changeAuthen: this.changeAuthen
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
              {/* <LoginPage /> */}
              <LoginPage onFocus={this.changeAuthen} />
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

