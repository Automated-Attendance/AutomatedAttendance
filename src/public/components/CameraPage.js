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
      spinner: false,
      checkedinUser: null,
      value: '',
      selectedTimeCutoff: null,
      options: [],
      attendancePopulated: false
    };

    ['takeScreenshot',
    'sendLateEmails',
    'populateAttendanceRecord',
    'updateSelectedTimeCutoff',
    'getSelectOptions',
    'handleSelectChange',
    'toggleOff'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
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
    let date = Moment(e);
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
    }, 5000);
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
            this.takeScreenshot();
            await this.populateAttendanceRecord();
          }}
        >Take Screenshot and Populate Attendance Records (and get ready to send emails)</button><br/><br/>
        {!this.state.attendancePopulated ? null : <h5>Populated daily attendance for {this.state.value} on {this.state.selectedTimeCutoff.format('dddd, MMM Do, YYYY')}!</h5>}
        <button className="lateStudentButton" onClick={this.sendLateEmails}>Send Email to Late Students</button><hr/>

      </div>
    );
  }
}
