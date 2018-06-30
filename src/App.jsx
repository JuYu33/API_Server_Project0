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
import Admin from './components/Admin';
import NewAR from './components/NewReport';
import Login from './components/Login';
import TestPage from './components/TestPage';
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
const AdminRoute = withRouter(({component: Component, admin, ...rest}) => {
  return <Route {...rest} render={(props) => {
    return admin
      ? <Component {...props} isAdmin={admin} />
      : <Redirect {...props} to={{
        pathname: '/test',
        state: { from: props.location }
      }} />
  }} />
})
const PrivateRoute =  withRouter(({ component: Component,logState,isAuditor, ...rest}) => {
  return <Route {...rest} render={(props) => {
    return logState
      ? <Component {...props} isAuditor={isAuditor}/>
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
      redirectToReferrer: true,
      isAuditor: true,
      isAdmin: true
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillUpdate(){
    
  }
  handleLogOut(e) {
    e.preventDefault();
    fakeAuth.signout(()=>{
      this.setState(() => ({
        redirectToReferrer: false,
        isLoggedin: false,
        isAdmin: false
      }))
    })
  }

  handleLogin(username, password, e) {
    e.preventDefault();
    if(username.length <= 0 || password.length <=0) {
      return this.setState({message: "Invalid Entry"});
    }
    /*
    if(user === 'admin'){
      (() => {
        fakeAuth.authenticate(()=>{
          this.setState(()=> ({
            redirectToReferrer: true,
            isLoggedin: true,
            isAdmin: true
          }))
        })
      })();
    } else if(user.length >= 0 && user === password && !fakeAuth.isAuthenticated) {
      (() => {
        fakeAuth.authenticate(()=>{
          this.setState(()=> ({
            redirectToReferrer: true,
            isLoggedin: true
          }))
        })
      })();

    //
    */
    // const uri1 = process.env.REACT_APP_URI_LOGIN;

    
    const uri1 = "http://localhost:8080/user/login";
    fetch(uri1, {
      body: JSON.stringify({username: username, password: password}),
      headers: {
        'content-type': "application/json"
      },
      method: "POST",
      mode: 'cors'
    })
      .then(response => {
        console.log(response);
        return response.status !== 200
          ? {success: false, message: "Email and/or Password entered incorrectly"}
          : response.json()
      })
      .then(result => {
          console.log(result);
          console.log(result.message);
          return !result.success 
            ? this.setState({message: result.message})
            : this.setState({
                redirectToReferrer: true,
                isLoggedin: true,
                token: result.token,
                name: result.name,
                isAdmin: result.isAdmin,
                isAuditor: result.isAuditor
              })
      })
  }

  render() {

    return (
      <Router>
        <div>
          <CustomNavbar isAdmin={this.state.isAdmin} loggedIn={this.state.isLoggedin} logout={this.handleLogOut}/>
            {/* <Route render={() => (<div> Sorry, this page does not exist. </div>)} /> */}
            {/* <Route path='/' exact component={Home} /> */}
            {/* <Route path='/about' component={About}/> */}

            <PrivateRoute  exact path='/'
              component={Home}
              logState={this.state.isLoggedin}
            />
            <AdminRoute path='/admin'
              component={Admin}
              logState={this.state.isLoggedin}
              admin={this.state.isAdmin}
            />
            <PrivateRoute path='/newar'
              component={NewAR}
              logState={this.state.isLoggedin}
              isAuditor={this.state.isAuditor}
            />
            {/* <PrivateRoute path="/newar"
              render={(props) => (
                <NewAR {...props}
                  logState={this.state.isLoggedin}
                  isAuditor={this.state.isAuditor}
                  testprop="I'm a test prop"
                />
              )}
            /> */}
            <Route path='/test' render={(props) => (
              <TestPage {...props} 
                onLogIn={this.handleLogin}
                redirectToReferrer={this.state.redirectToReferrer}
              />
              )}
            />
            <Route path='/login' render={(props) => (
              <Login {...props} 
                message={this.state.message}
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
