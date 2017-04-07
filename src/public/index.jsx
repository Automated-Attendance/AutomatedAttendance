import React from 'react';
import ReactDOM from 'react-dom';
import CameraPage from './components/CameraPage.jsx';
import About from './components/About.jsx';
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
                    <Link to="/About">About</Link>
                  </li>
                  <li>
                    <a href="/login">Log In</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div>
            <Route path="/CameraPage" component={CameraPage}/>
            <Route path="/About" component={About}/>
          </div>
          
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));