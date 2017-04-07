'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import autoBind from 'react-autobind';


export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);
    console.log(Keys);

    this.state = {
      screenshot: null
    };
    autoBind(this);
  }

  @keydown('space')
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