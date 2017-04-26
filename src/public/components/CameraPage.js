import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { queryGallery } from '../requests/gallery';
import Select from 'react-select';
import Spinner from './Spinner';
import DateTime from 'react-widgets/lib/DateTimePicker';
import { getClasses } from '../requests/classes';
import Moment from 'moment';
import { storeAttendanceRecord, emailLateStudents } from '../requests/students';


export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      options: [],
      spinner: false,
      checkedinUser: null,
      selectedTimeCutoff: null,
      attendancePopulated: false,
      intervalId: null
    };

    'sendLateEmails',
    ['takeScreenshot',
    'getSelectOptions',
    'handleSelectChange',
    'populateAttendanceRecord',
    'updateSelectedTimeCutoff',
    'toggleOff', 
    'clearDOMValue'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentWillMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
    clearInterval(this.state.intervalId);
  }

  async takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ spinner: true });
    const checkedIn = await queryGallery(screenshot);
    let checkedInStudents = [];
    if (checkedIn.length) {
      checkedIn.forEach((student) => checkedInStudents.push(`${student.first_name}  ${student.last_name}`));
    }
    this.setState({ spinner: false, checkedinUser: `Checked in: ${checkedInStudents.join(', ')}!` });
  }

  clearDOMValue(ref) {
    setTimeout(() => {
      this.refs[ref]._values.value = null
    }, 4000);
  }

  startCamera() {
    let end = Moment(this.state.selectedTimeCutoff).add(30, 'minute');
    let intervalId = setInterval(() => {
      let currentTime = Moment();
      //uncomment this if you are testing the automated camera
      this.takeScreenshot();
      if (currentTime.isAfter(end)) {
        clearInterval(intervalId);
      };
    }, 3000);
    this.setState({ intervalId });
  }

  async sendLateEmails () {
    await emailLateStudents(this.state.selectedTimeCutoff);
  }

  async populateAttendanceRecord() {
    if (this.state.value && this.state.selectedTimeCutoff) {
      this.setState({ spinner: true, statusUpdated: false });
      this.setState({ attendancePopulated: await storeAttendanceRecord(this.state.value, this.state.selectedTimeCutoff) });
      this.setState({ spinner: false });
    } else {
      alert('Select Class(es) and Cutoff Time!');
    }
    this.toggleOff('attendancePopulated', 'value', 'selectedTimeCutoff');
  }

  updateSelectedTimeCutoff(e) {
    let date = Moment(e).format('YYYY-MM-DD HH:mm:ss');
    this.setState({ selectedTimeCutoff: date });
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

  toggleOff(status, ...states) {
    setTimeout(() => {
      if (status) {
        this.setState({ [status]: false });
      }
      states.forEach((state) => {
        if (typeof this.state[state] === 'boolean') {
          this.setState({ [state]: false});
        } else if (Array.isArray(this.state[state])) {
          this.setState({ [state]: [] })
        } else {
          this.setState({ [state]: null })
        }
      });
    }, 5000);
  }

  render() {
    return (
      <div className="container">

        { this.state.mounted && <div className="col-md-8 webcam-component"><Webcam ref='webcam'/></div> }

        {this.state.spinner && <Spinner/>}
        {this.state.checkedinUser}

        <div className="col-md-4 start-attendance-form">

          <h3 className="text-center">Start Daily Attendance</h3>

          <hr />

          <h5 className="form-title">Class:</h5>
          <div className="classSelect" onClick={!this.state.options.length && this.getSelectOptions}>
            <Select 
              multi={true}
              simpleValue
              value={this.state.value}
              placeholder="Select Class(es)..."
              options={this.state.options}
              onChange={this.handleSelectChange}
            />
          </div>

          <br/>

          <h5 className="form-title">Cutoff Time:</h5>
          <DateTime
            placeholder="Select Cutoff Time..."
            onChange={this.updateSelectedTimeCutoff}
            calendar={false}
            ref='DateTime'
          />

          <br/>
          
          <button
            className="populateAttendanceRecord login-button btn btn-primary"
            onClick={async () => {
              await this.populateAttendanceRecord();
              this.toggleOff(null, 'options', 'selectedTimeCutoff');
              this.clearDOMValue('DateTime');
              this.startCamera();
            }}>
            Start Camera and Populate Attendance Records
          </button>

          {!this.state.attendancePopulated ? null : 
            <h5>
              Populated daily attendance for {this.state.value} on {Moment(this.state.selectedTimeCutoff).format('dddd, MMM Do, YYYY')}! <br/>
              Must remain on this page for the camera to continue monitoring attendance. <br/>
              If you populated the wrong time, you must go to the Attendance page to delete today's records before resubmitting this form. 
            </h5>
          }
        </div>

      </div>
    );
  }
}
