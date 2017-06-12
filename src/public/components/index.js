import React from 'react';
import Routes from './Routes';
import Navigation from './Navigation';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLoginStatus } from '../actions/userActions';

class App extends React.Component {

  componentWillMount() {
    this.props.fetchLoginStatus();
  }

  render () {
    return (
      <Router>
        <div>
          <Navigation userPrivs={this.props}/>
          <Routes userPrivs={this.props}/>
        </div>
      </Router>
    );
  }
};

function mapStateToProps({ userStatus: { isLoggedIn, isAdmin, userEmail } }) {
  return {
    isLoggedIn,
    isAdmin,
    userEmail
  };
}

export default connect(mapStateToProps, { fetchLoginStatus })(App);
