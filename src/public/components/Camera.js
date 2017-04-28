import React from 'react';
import Spinner from './Spinner';
import Moment from 'moment';
import Webcam from 'react-webcam';
import {getClasses} from '../requests/classes';
import {queryGallery} from '../requests/gallery';
import {storeAttendanceRecord, emailLateStudents} from '../requests/students';
import StartAttendance from './StartAttendance';

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      options: [],
      spinner: false,
      attendancePopulated: false,
      checkedinUser: null,
      selectedTimeCutoff: null,
      intervalId: null
    };

    ['getSelectOptions',
    'updateSelectedTimeCutoff',
    'populateAttendanceRecord',
    'startCamera',
    'takeScreenshot',
    'handleSelectChange',
    'handleSubmitStartAttendance',
    'sendLateEmails'].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentWillMount() {
    this.setState({mounted: true});
    this.getSelectOptions();
  }

  componentWillUnmount() {
    this.setState({mounted: false});
    clearInterval(this.state.intervalId);
  }

  async getSelectOptions() {
    const classList = await getClasses();
    const classes = classList.classes.map(classname => {
      return {label: classname, value: classname};
    });
    this.setState({options: classes});
  }

  updateSelectedTimeCutoff(e) {
    let date = Moment(e).format('YYYY-MM-DD HH:mm:ss');
    this.setState({selectedTimeCutoff: date});
  }

  async populateAttendanceRecord() {
    if (this.state.value && this.state.selectedTimeCutoff) {
      this.setState({statusUpdated: false});
      this.setState({attendancePopulated: await storeAttendanceRecord(this.state.value, this.state.selectedTimeCutoff)});
    } else {
      alert('Select Class(es) and Cutoff Time!');
    }
    this.setState({attendancePopulated: true});
  }

  startCamera() {
    let end = Moment(this.state.selectedTimeCutoff).add(30, 'minute');
    this.setState({spinner: true});
    let intervalId = setInterval(() => {
      let currentTime = Moment();
      this.takeScreenshot();
      if (currentTime.isAfter(end)) {
        clearInterval(intervalId);
        this.setState({spinner: false});
      };
    }, 1500);
    this.setState({intervalId});
  }

  async takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    const checkedIn = await queryGallery(screenshot);
    let checkedInStudents = [];
    if (checkedIn && checkedIn.length) {
      checkedIn.forEach(student => checkedInStudents.push(`${student.first_name}${student.last_name !== 'undefined' ? ' ' + student.last_name : ''}`));
      this.setState({checkedinUser: `Checked in: ${checkedInStudents.join(', ') + '!'}`});
    }
  }

  handleSelectChange(value) {
    this.setState({value});
  }

  async handleSubmitStartAttendance() {
    await this.populateAttendanceRecord();
    this.startCamera();
  }

  async sendLateEmails () {
    await emailLateStudents(this.state.selectedTimeCutoff);
  }

  render() {
    return (
      <div className="container">
        {this.state.mounted && <div className="col-md-8 webcam-component"><Webcam ref='webcam'/></div>}
        {this.state.spinner && <Spinner/>}
        {this.state.checkedinUser}
        <StartAttendance
          attendancePopulated={this.state.attendancePopulated}
          selectedClass={this.state.value}
          selectedTime={this.state.selectedTimeCutoff}
          classOptions={this.state.options}
          handleChangeSelect={this.handleSelectChange}
          handleChangeTime={this.updateSelectedTimeCutoff}
          startCamera={this.startCamera}
          clearDOM={this.clearDOMValue}
          handleSubmit={this.handleSubmitStartAttendance}
        />
      </div>
    );
  }
};
