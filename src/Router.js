import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import Navbar from './components/Core/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Major from './components/Major'
import Questions from "./components/Questions"
import Preview from "./components/Preview"
import Success from './components/Success'
import Edit from './components/Edit'
import General from './components/General'

const fakeAuth =  {
  isAuthenticated: true,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

const PrivateRoute = ({ children, ...rest },props) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
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
    fakeAuth.isAuthenticated = isAuthenticated
  }
  return (
    <Login callbackFromRouter={myCallback} login={login} />
  );
}

export default class Index extends React.Component {

  state = {
    wipId: null

  }
  componentDidMount() {
    // console.log(this.state.isAuthenticated)
  }

  componentDidUpdate(){
    // console.log(this.state.wipId + "555")
  }

  myCall = (wipId) => {
    this.setState({
      wipId: wipId
    })
  }

  render() {
    
    return (
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
            <LoginPage />
          </Route>
          <PrivateRoute path="/profile" isAuthenticated={this.state.isAuthenticated}>
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/general" isAuthenticated={this.state.isAuthenticated}>
            <General />
          </PrivateRoute>
          <PrivateRoute path="/major" isAuthenticated={this.state.isAuthenticated}>
            <Major />
          </PrivateRoute>
          <PrivateRoute path="/questions" isAuthenticated={this.state.isAuthenticated}>
            <Questions />
          </PrivateRoute>
          <PrivateRoute path="/preview" isAuthenticated={this.state.isAuthenticated}>
            <Preview />
          </PrivateRoute>
          <PrivateRoute path="/success" isAuthenticated={this.state.isAuthenticated}>
            <Success />
          </PrivateRoute>
          <PrivateRoute path="/edit" isAuthenticated={this.state.isAuthenticated}>
            <Edit />
          </PrivateRoute>
          <PrivateRoute path="*" isAuthenticated={this.state.isAuthenticated} />
        </Switch>
      </Router>
    )
  }
}

