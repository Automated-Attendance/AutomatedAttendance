import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import autoBind from 'react-autobind';
import Navigation from './components/Navigation.jsx';
import { get } from './components/AxiosRoutes';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
    autoBind(this);
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

ReactDOM.render(<App />, document.getElementById('app'));
