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
      loggedIn: false,
      admin: false
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
          this.setState({ admin: true });
        }
        this.setState({ loggedIn: true });
      }
    });
  }

  render () {
    return (
      <Router>
        <div className="container">

          <Navigation 
            loggedIn={this.state.loggedIn}
            admin={this.state.admin}
          />

          <Routes userAuth={this.state}/>

        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
