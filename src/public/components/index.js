import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../Routes';
import Navigation from './Navigation';
import { get } from './AxiosRoutes';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      userEmail: null
    };
    
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    get('userData')
    .then(({ data }) => {
      if (data !== 'not logged in') {
        if (data[0].type === 'admin') {
          this.setState({ isAdmin: true });
        }
        this.setState({ isLoggedIn: true });
        this.setState({ userEmail: data.email})
      }
    });
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
