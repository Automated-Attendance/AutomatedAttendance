import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { queryGallery } from './requests/gallery';
import Select from 'react-select';
import Spinner from './Spinner';
import DateTime from 'react-widgets/lib/DateTimePicker';
import { getClasses } from './requests/classes';
import Moment from 'moment';
import { storeAttendanceRecord, emailLateStudents } from './requests/students';


export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      options: [],
      spinner: false,
      checkedinUser: null,
      selectedTimeCutoff: null,
      attendancePopulated: false
    };

    'sendLateEmails',
    ['takeScreenshot',
    'getSelectOptions',
    'handleSelectChange',
    'populateAttendanceRecord',
    'updateSelectedTimeCutoff',
    'toggleOff'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentWillMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    if (this.state.startCam) {
      clearInterval(this.state.startCam);
    }
    this.setState({ mounted: false });
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

  startCamera () {
    // testing purposes making it so its only 1 minute after cut off time
    // put in however much time you need for how much time afterwards

    let end = Moment(this.state.selectedTimeCutoff).add(1,'minute');
    this.setState({
      startCam: setInterval( ()=> {
        let currentTime = Moment();
        //uncomment this if you are testing the automated camera
        this.takeScreenshot();
          if (currentTime.isAfter(end)) {
            //stop taking pictures of the camera
            clearInterval(startCam)
          };
      },3000)})
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
      this.setState({ [status]: false });
      states.forEach((state) => {
        this.setState({ [state]: false});
      });
    }, 15000);
  }

  render() {
    return (
      <div>

        { this.state.mounted && <div><Webcam ref='webcam'/></div> }

        <div>
          <button className="screenShotButton" onClick={this.takeScreenshot}>Take Screenshot</button>
        </div>

        {this.state.spinner && <Spinner/>}
        {this.state.checkedinUser}

        <hr/>
        <h3>Start Daily Attendance</h3>
        Class:
        <div className="classSelect" onClick={!this.state.options.length && this.getSelectOptions}>
          <Select 
            multi={true}
            simpleValue
            value={this.state.value}
            placeholder="Select Class(es)..."
            options={this.state.options}
            onChange={this.handleSelectChange}
          />
        </div><br/>
        Cutoff Time:
        <DateTime
          placeholder="Select Cutoff Time..."
          onChange={this.updateSelectedTimeCutoff}
          calendar={false}
        /><br/>
        <button
          className="populateAttendanceRecord"
          onClick={async () => {
            await this.populateAttendanceRecord();
            this.startCamera();
          }}
        >Start Camera and Populate Attendance Records and get ready to send emails</button><br/><br/>
        {!this.state.attendancePopulated ? null : 
          <h5>
            Populated daily attendance for {this.state.value} on {Moment(this.state.selectedTimeCutoff).format('dddd, MMM Do, YYYY')}! <br/>
            Must remain on this page for the camera to continue monitoring attendance. <br/>
            If you populated the wrong time, you must go to the Attendance page to delete today's records before resubmitting this form. 
          </h5>}
        <button className="lateStudentButton" onClick={this.sendLateEmails}>Send Email to Late Students</button><hr/>

      </div>
    );
  }
}
