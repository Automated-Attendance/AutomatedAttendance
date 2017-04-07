'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';


class CameraPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screenshot: null
    };

    this.takeScreenshot = this.takeScreenshot.bind(this);
  }

  takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ screenshot: screenshot });
  }

  render() {
    return (
      <div>

        <Webcam
          ref='webcam'
        />;

        <h1> Screenshots </h1>

        <div className="screenshots">
          <button onClick={this.takeScreenshot}>Take Screenshot</button>
          { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
        </div>

      </div>
    );
  }
}

ReactDOM.render(<CameraPage />, document.getElementById('main'));