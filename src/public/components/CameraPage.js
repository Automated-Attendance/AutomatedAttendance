import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { cloudinaryUpload } from './requests/cloudinary';
import { queryGallery } from './requests/gallery';
import { sendEmails } from './requests/emails';
import { getClasses } from './requests/classes';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);

    ['takeScreenshot',
    'getSelectOptions',
    'handleSelectChange',
    'toggleDisabled',
    'testBundle'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = {
      screenshot: null,
      screenshotURL: null,
      spinner: false,
      disabled: false,
      options: [],
      value: []
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
    const screenshotURL = await cloudinaryUpload(screenshot);
    this.setState(screenshotURL);
    console.log( await queryGallery(this.state.screenshotURL) );
  }

  async getSelectOptions() {
    console.log('im here');
    const classList = await getClasses();
    const classes = classList.classes.map((classname) => {
      return { label: classname, value: classname };
    });
    this.setState({ options: classes });
  }

  handleSelectChange(value) {
    this.setState({ value });
  }

  toggleDisabled(e) {
    this.setState({ disabled: e.target.checked });
  }

  render() {
    return (
      <div>

      <div onClick={!this.state.options.length && this.getSelectOptions}>
        <Select 
          multi={true}
          simpleValue
          disabled={this.state.disabled}
          value={this.state.value}
          placeholder="Select your classes"
          options={this.state.options}
          onChange={this.handleSelectChange}
        />
      </div>

        <Webcam
          ref='webcam'
        />;

        <h1> Screenshots </h1>

        <div className="screenshots">
          <button className="screenShotButton" onClick={this.takeScreenshot}>Take Screenshot</button>
          { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
          <button className="emailButton" onClick={sendEmails}>Send Emails</button>
        </div>

      </div>
    );
  }
}