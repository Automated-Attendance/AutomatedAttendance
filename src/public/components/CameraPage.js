import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { cloudinaryUpload } from './requests/cloudinary';
import { queryGallery } from './requests/gallery';
// import { sendEmails } from './requests/emails';
import { getClasses } from './requests/classes';
import Select from 'react-select';
import Spinner from './Spinner';
import 'react-select/dist/react-select.css';
import { getStudentInCertainClasses } from './requests/attendancerecord';


export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);
    
    ['takeScreenshot',
    'getSelectOptions',
    'handleSelectChange',
    'toggleDisabled',
    'testBundle',
    'populateAttendanceRecord'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = {
      screenshot: null,
      screenshotURL: null,
      spinner: false,
      disabled: false,
      options: [],
      value: null,
      selectedClasses: [],
      checkedinUser: null
    };
  }



  @keydown('space')
  takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ screenshot: screenshot, spinner: true });
    this.testBundle(this.state.screenshot);
  }



  // strictly for testing functionality
  async testBundle(screenshot) {
    const screenshotURL = await cloudinaryUpload(screenshot);
    this.setState(screenshotURL);
    console.log( await queryGallery(this.state.screenshotURL) );
    this.setState({ spinner: false, checkedinUser: 'hardcoded guy checked in' });
  }



  async getSelectOptions() {
    const classList = await getClasses();
    const classes = classList.classes.map((classname) => {
      return { label: classname, value: classname };
    });
    this.setState({ options: classes });
  }



  handleSelectChange(value) {
    const selectedClasses = value.split(',');
    this.setState({ value, selectedClasses });
  }



  toggleDisabled(e) {
    this.setState({ disabled: e.target.checked });
  }



  // getting class list from DB
  async updateClassList() {
    const classes = await getClasses();
    this.setState(classes);
  }

<<<<<<< 35bcc174bf45558d0565840d0a9d16cb16f947d9

=======
  async populateAttendanceRecord () {
    const student = await getStudentInCertainClasses(this.state.value);
  }
>>>>>>> Input Users into attendance record upon clicking add attendance

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

        <div>
          <Webcam ref='webcam'/>
        </div>

        <h1> Screenshots </h1>
        
        <div>
          <button className="populateAttendanceRecord" onClick={this.populateAttendanceRecord}> Populate Attendance Records </button>
        </div>

        {this.state.spinner && <Spinner/>}
        {this.state.checkedinUser}

      </div>
    );
  }
}

// <button className="emailButton" onClick={sendEmails}>Send Emails</button>