import React from 'react';
import ReactDOM from 'react-dom';
import CameraPage from './components/CameraPage.jsx';
import Student from './components/Student.jsx';
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
                    <a href="/Student">Student</a>
                  </li>
                  <li>
                    <a href="/login">Log In</a>
                  </li>
                  <li>
                    <div className="credit-photos">
                      by: AA Allstars
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            This is text on the page.
          </div>

          <div>
            <Route path="/Student" component={Student}/>
            <Route path="/CameraPage" component={CameraPage}/>
          </div>
          
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
