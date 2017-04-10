import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import Navigation from './Navigation';
import { getUserData } from './requests/users';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
  }

  async componentWillMount() {
    this.setState( await getUserData() );
  }

  render () {
    return (
      <Router>
        <div className="container">

          <Navigation userPrivs={this.state}/>

          <Routes userPrivs={this.state}/>

        </div>
      </Router>
    );
  }
}
