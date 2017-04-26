import React from 'react';
import Routes from './Routes';
import Navigation from './Navigation';
import {getUserData} from '../requests/users';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      userEmail: null
    };
  }

  async componentWillMount() {
    const loginStatus = await getUserData();
    this.setState(loginStatus);
  }

  render () {
    return (
      <Router>
        <div className="container homepage-container">
          <Navigation userPrivs={this.state}/>
          <Routes userPrivs={this.state}/>
        </div>
      </Router>
    );
  }
};