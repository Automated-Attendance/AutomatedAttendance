import React from 'react';
import ReactDOM from 'react-dom';
import CameraPage from './components/CameraPage.jsx';
import Student from './components/Student.jsx';
import Admin from './components/Admin.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import AddStudent from './components/AddStudent.jsx';
import Navigation from './components/Navigation.jsx';
import LoginRedirect from './components/LoginRedirect.jsx';
import autoBind from 'react-autobind';
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
          <div className="container">
            This is text on the page.
          </div>
          <div>
            <Route path="/Student" component={() => this.state.loggedIn ? <Student/> : <LoginRedirect/> }/>
            <Route path="/CameraPage" component={() => this.state.admin ? <CameraPage/> : <LoginRedirect/> }/>
            <Route path="/Admin" component={() => this.state.admin ? <Admin/> : <LoginRedirect/> }/>
            <Route path="/About" component={About}/>
            <Route path="/Contact" component={Contact}/>
            <Route path="/AddStudent" component={() => this.state.admin ? <AddStudent/> : <LoginRedirect/> }/>
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
