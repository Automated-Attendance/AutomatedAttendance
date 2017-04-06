import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render () {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">

              </div>

              <div id="navbar" className="navbar-collaspe">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="/">Log In</a>
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
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));