'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import autoBind from 'react-autobind';
import { post, get } from './AxiosRoutes';


export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      screenshotURL: null,
      spinner: false
    };
    autoBind(this);
  }

  @keydown('space')
  takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ screenshot: screenshot });
    this.uploadToCloudinary(screenshot);
  }

  async uploadToCloudinary(screenshot) {
    try {
      const { data } = await post('cloudinarySend', { img: screenshot })
      this.setState({ screenshotURL: data.secure_url });
      this.uploadToKairosGallery();
    } catch (err) {
      console.warn(err);
    }
  }

  async uploadToKairosGallery() {
    try {
      await post('galleryStore', { img: this.state.screenshotURL })
      this.queryKairosGallery();
    } catch (err) {
      console.warn(err);
    }
  }

  async queryKairosGallery() {
    try {
      const { data } = await post('recognize', { img: this.state.screenshotURL })
      console.log(data);
    } catch (err) {
      console.warn(err);
    }
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