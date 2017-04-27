import React from 'react';
import Routes from './Routes';
import Navigation from './Navigation';
import {getUserData} from '../requests/users';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Spinner from './Spinner';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      userEmail: null,
      spinner: false
    };

    this.toggleSpinner = this.toggleSpinner.bind(this);
  }

  async componentWillMount() {
    const loginStatus = await getUserData();
    this.setState(loginStatus);
  }

  toggleSpinner(bool) {
    this.setState({ spinner: bool ? true : false });
  }

  render () {
    return (
      <Router>
        <div>
          <Navigation userPrivs={this.state}/>
          {this.state.spinner && <Spinner/>}
          <Routes 
            userPrivs={this.state}
            toggleSpinner={this.toggleSpinner}
          />
        </div>
      </Router>
    );
  }
};