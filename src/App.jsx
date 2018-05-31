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

const PrivateRoute = withRouter(({ component: Component, ...rest}) => {
  // console.log("Outer Props: ", props);
  return <Route {...rest} render={(props) => {
    console.log("Inner props: ", props);
    console.log("logstate: ", props.logState);
    return fakeAuth.isAuthenticated === true
      ? <Component {...props}/>
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
      isLoggedin : false,
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
            <Route path='/' exact component={Home} />
            <PrivateRoute  path='/newar'
              // render={(props) => (
              //   <NewAR 
              //     {...props} 
                  logState={this.state.isLoggedin} 
              //   />
              // )}
              component={NewAR}
            />
            <Route path='/login' render={(props) => (
              <Login {...props} 
                onLogIn={this.handleLogin}
                redirectToReferrer={this.state.redirectToReferrer}
              />
              )}
            />
            <Route path='/about' component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
