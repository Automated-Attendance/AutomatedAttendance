import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { cloudinaryUpload } from './requests/cloudinary';
import { queryGallery } from './requests/gallery';

export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);

    ['takeScreenshot', 'testBundle'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = {
      screenshot: null,
      screenshotURL: null,
      spinner: false
    };
  }

  @keydown('space')
  takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ screenshot: screenshot });
    this.testBundle(this.state.screenshot);
  }

  // strictly for testing functionality
  async testBundle(screenshot) {
    this.setState( await cloudinaryUpload(screenshot) );
    console.log( await queryGallery(this.state.screenshotURL) );
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