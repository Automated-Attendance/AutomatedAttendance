import React from 'react';
import ReactDOM from 'react-dom';
import CameraPage from './components/CameraPage.jsx';
import Admin from './components/Admin.jsx'
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render () {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand" >Automated Attendance</Link>
              </div>

              <div id="navbar" className="navbar-collaspe">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="/Admin">Admin</a>
                  </li>
                  <li>
                    <a href="/login">Log In</a>
                    <Link to="/About">About</Link>
                  </li>
                  <li>
                    <Link to="/Contact">Contact</Link>
                  </li>
                  <li>
                    <a href="/login">Log In</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            This is text on the page.
          </div>
          <div>
            <Route path="/CameraPage" component={CameraPage}/>
            <Route path="/Admin" component={Admin}/>
            <Route path="/About" component={About}/>
            <Route path="/Contact" component={Contact}/>
          </div>
          
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
