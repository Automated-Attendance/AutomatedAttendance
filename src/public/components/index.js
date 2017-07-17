import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoginStatus } from '../actions/UserActions';

import Navigation from './Navigation';
import Camera from './Camera';
import Student from './Student';
import Admin from './Admin';
import About from './About';
import Contact from './Contact';
import Enrollment from './Enrollment';
import LoginRedirect from './LoginRedirect';
import Landing from './LandingPage/LandingIndex';

class App extends React.Component {

  componentWillMount() {
    this.props.getLoginStatus();
  }

  render () {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <Router>
        <div>
          <Navigation userPrivs={this.props}/>
          <Switch>
            <Route path="/About" component={About}/>
            <Route path="/Contact" component={Contact}/>
            <Route path="/Student" component={() => isLoggedIn && !isAdmin ? <Student /> : <LoginRedirect />}/>
            <Route path="/Camera" component={() => isAdmin ? <Camera/> : <LoginRedirect />}/>
            <Route path="/Admin" component={() => isAdmin ? <Admin/> : <LoginRedirect />}/>
            <Route path="/Enrollment" component={() => isAdmin ? <Enrollment/> : <LoginRedirect />}/>
            <Route path="/" component={Landing}/>
          </Switch>
        </div>
      </Router>
    );
  }
};

function mapStateToProps({ userStatus }) {
  return {
    isAdmin: userStatus.isAdmin,
    isLoggedIn: userStatus.isLoggedIn
  };
}

export default connect(mapStateToProps, { getLoginStatus })(App);
