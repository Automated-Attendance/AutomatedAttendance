import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { queryGallery } from './requests/gallery';
// import { sendEmails } from './requests/emails';
import { getClasses } from './requests/classes';
import Select from 'react-select';
import Spinner from './Spinner';
import 'react-select/dist/react-select.css';
import 'react-widgets/lib/less/react-widgets.less';
import DateTime from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import { storeAttendanceRecord } from './requests/students';
import MomentTZ from 'moment-timezone';

// init time localization for DateTimePicker
momentLocalizer(Moment);

export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);
    
    ['takeScreenshot',
    'getSelectOptions',
    'handleSelectChange',
    'populateAttendanceRecord',
    'updateSelectedTimeCutoff'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = {
      spinner: false,
      disabled: false,
      options: [],
      value: null,
      checkedinUser: null,
      selectedTimeCutoff: null,
      noClassSelected: true
    };
  }

  componentWillMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  @keydown('space')
  async takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ spinner: true });
    console.log( await queryGallery(screenshot) );
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
    this.setState({ value });
  }

  // getting class list from DB
  async updateClassList() {
    const classes = await getClasses();
    this.setState(classes);
  }

  async populateAttendanceRecord() {
    if (this.state.value && this.state.selectedTimeCutoff) await storeAttendanceRecord(this.state.value, this.state.selectedTimeCutoff);
    else alert('You must select classes and check in time before populating Attendance Records.');
  }

  updateSelectedTimeCutoff(e) {
    let date = MomentTZ.tz(new Date(e), "America/Los_angeles").format();
    this.setState({ selectedTimeCutoff: date });
  }

  render() {
    return (
      <div>

        <DateTime 
          defaultValue={new Date()}
          onChange={this.updateSelectedTimeCutoff}
        />

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

        { this.state.mounted && <div><Webcam ref='webcam'/></div> }

        <h1> Screenshots </h1>
        
        <div>
          <button className="screenShotButton" onClick={this.takeScreenshot}>Take Screenshot</button>
          <button className="populateAttendanceRecord" onClick={this.populateAttendanceRecord}> Populate Attendance Records </button>


        </div>

        {this.state.spinner && <Spinner/>}
        {this.state.checkedinUser}

      </div>
    );
  }
}

// <button className="emailButton" onClick={sendEmails}>Send Emails</button>
