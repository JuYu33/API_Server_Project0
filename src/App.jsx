import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NewAR from './components/NewAR';
import Login from './components/Login';
// import Protected from './components/Protected'
import CustomNavbar from './components/CustomNavbar';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {

    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb,100);
  }
}

const PrivateRoute =  withRouter(({ component: Component,logState, ...rest}) => {
  return <Route {...rest} render={(props) => {
    return logState
      ? <Component {...props} loggedIn={logState}/>
      : <Redirect {...props} to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  }} />
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoggedin : false
      isLoggedin : true,
      redirectToReferrer: false,
      isAuditor: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    fakeAuth.signout(()=>{
      this.setState(() => ({
        redirectToReferrer: false,
        isLoggedin: false
      }))
    })
  }

  handleLogin(user, por, e) {
    e.preventDefault();
    if(user.length >= 0 && user === por && !fakeAuth.isAuthenticated) {
      (() => {
        fakeAuth.authenticate(()=>{
          this.setState(()=> ({
            redirectToReferrer: true,
            isLoggedin: true
          }))
        })
      })();
    }
  }

  render() {
    
    return (
      <Router>
        <div>
          <CustomNavbar loggedIn={this.state.isLoggedin} logout={this.handleLogOut}/>
            {/* <Route render={() => (<div> Sorry, this page does not exist. </div>)} /> */}
            {/* <Route path='/' exact component={Home} /> */}
            {/* <Route path='/about' component={About}/> */}

            <PrivateRoute  exact path='/'
              component={Home}
              logState={this.state.isLoggedin}
            />
            <PrivateRoute path='/about'
              component={About}
              logState={this.state.isLoggedin}
            />
            <PrivateRoute path='/newar'
              component={NewAR}
              logState={this.state.isLoggedin}
            />
            <Route path='/login' render={(props) => (
              <Login {...props} 
                onLogIn={this.handleLogin}
                redirectToReferrer={this.state.redirectToReferrer}
              />
              )}
            />
        </div>
      </Router>
    );
  }
}

export default App;
