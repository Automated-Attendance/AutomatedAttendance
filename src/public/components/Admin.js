import React from 'react';
import { Link } from 'react-router-dom';
import { getAttendanceRecords } from './requests/classes';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import tableHelpers from './helpers/tableHelpers.js'
import { storeAttendanceRecord, emailLateStudents } from './requests/students';
import { getClasses } from './requests/classes';
import DateTime from 'react-widgets/lib/DateTimePicker';
import 'react-select/dist/react-select.css';
import 'react-widgets/lib/less/react-widgets.less';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import MomentTZ from 'moment-timezone';
import Select from 'react-select';

// init time localization for DateTimePicker
momentLocalizer(Moment);


export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    ['sendLateEmails',
    'populateAttendanceRecord',
    'updateSelectedTimeCutoff',
    'getSelectOptions',
    'getAttendance',
    'handleSelectChange'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = {
      attendance: [],
      options: [],
      classes: {},
      students: {},
      emails: {},
      statuses: {},
      value: null,
      selectedTimeCutoff: null
    };
  }

  async componentWillMount() {
    await this.getAttendance();
  }

  async getAttendance() {
    const queryType = {queryType: 'allAttendance'};
    const attendanceRecords = await getAttendanceRecords(queryType);   
    attendanceRecords.forEach((item) => {
      item.date = tableHelpers.parseDateAndTime(item.date);
      if (!this.state.classes[item.class_name]) {
        let thisClass = this.state.classes;
        thisClass[item.class_name] = item.class_name;
        this.setState({
          classes: thisClass
        });
      }
      if (!this.state.statuses[item.status]) {
        let thisStatus = this.state.statuses;
        thisStatus[item.status] = item.status;
        this.setState({
          statuses: thisStatus
        });
      }
      let fullName = `${item.first_name} ${item.last_name}`;
      item.full_name = fullName;
      if (!this.state.emails[item.email]) {
        let thisEmail = this.state.emails;
        let thisStudent = this.state.students;
        thisEmail[item.email] = item.email;
        thisStudent[fullName] = fullName;
        this.setState({
          emails: thisEmail,
          students: thisStudent
        });
      }
    });
    this.setState({attendance: attendanceRecords});
  }

  async sendLateEmails () {
    await emailLateStudents(this.state.selectedTimeCutoff);
  }

  async populateAttendanceRecord() {
    if (this.state.value && this.state.selectedTimeCutoff) await storeAttendanceRecord(this.state.value, this.state.selectedTimeCutoff);
    else alert('You must select classes and check in time before populating Attendance Records.');
    await this.getAttendance();

  }

  updateSelectedTimeCutoff(e) {
    let date = MomentTZ.tz(new Date(e), "America/Los_angeles").format();
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

        <DateTime 
          defaultValue={new Date()}
          onChange={this.updateSelectedTimeCutoff}
        />

      <button className="lateStudentButton" onClick={this.sendLateEmails}>Send Email to late Students</button>
      <button className="populateAttendanceRecord" onClick={this.populateAttendanceRecord}> Populate Attendance Records </button>

        <BootstrapTable
          data = {this.state.attendance}
          csvFileName = {'Attendance.csv'}
          maxHeight = '750px'
          scrollTop = {'Top'}
          multiColumnSort = {5}
          striped
          hover
          condensed
          exportCSV
        >
          <TableHeaderColumn
            isKey
            dataField = 'class_name'
            width = '15%'
            dataSort
            filterFormatted
            filter = {{
              type: 'SelectFilter',
              options: this.state.classes
            }}
          >
            Class
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField = 'full_name'
            width = '25%'
            dataSort
            sortFunc = {tableHelpers.nameSort}
            filterFormatted
            filter = {{
              type: 'TextFilter'
            }}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField = 'date'
            width = '30%'
            dataAlign = 'right'
            dataFormat = {tableHelpers.dateFormatter}
            dataSort
            filterFormatted
            filter = {{
              type: 'TextFilter',
            }}
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField = 'date'
            width = '15%'
            dataAlign = 'right'
            dataSort
            dataFormat = {tableHelpers.timeFormatter}
          >
            Time
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField = 'status'
            width = '15%'
            dataSort
            filterFormatted
            filter = {{
              type: 'SelectFilter',
              options: this.state.statuses
            }}
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
