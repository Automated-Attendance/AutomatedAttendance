import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import Navigation from './Navigation';
import { get } from './AxiosRoutes';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
    
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  async isLoggedIn() {
    try {
      const { data } = await get('userData');
      const loggedIn = data !== 'not logged in';
      if (loggedIn && data[0].type === 'admin') this.setState({ isAdmin: true });
      if (loggedIn) this.setState({ isLoggedIn: true });
    } catch (err) {
      // todo: handle client side errors better
      console.warn(err);
    }
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
