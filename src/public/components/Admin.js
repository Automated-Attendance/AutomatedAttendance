import React from 'react';
import Moment from 'moment';
import Spinner from './Spinner';
import Select from 'react-select';
import MomentTZ from 'moment-timezone';
import { Link } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import { getAllUsers } from './requests/users';
import 'react-widgets/lib/less/react-widgets.less';
import tableHelpers from './helpers/tableHelpers.js'
import DateTime from 'react-widgets/lib/DateTimePicker';
import VirtualizedSelect from 'react-virtualized-select';
import { changeAttendanceStatus } from './requests/students';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { getAttendanceRecords, getAttendanceRecordDate } from './requests/classes';

// init time localization for DateTimePicker
momentLocalizer(Moment);

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attendance: [],
      classes: {},
      students: {},
      emails: {},
      statuses: {},
      selectedDate: {},
      selectedStudent: '',
      selectedStatus: '',
      statusUpdated: false,
      studentOptions: [],
      spinner: false,
      attendanceInterval: null,
      changeNeeded: false,
      statusOptions: [
        {label: 'On time', value: 'On time'},
        {label: 'Tardy', value: 'Tardy'},
        {label: 'Absent', value: 'Absent'},
        {label: 'Pending', value: 'Pending'}
      ]
    };

    ['getAttendance',
    'getExistingUserList',
    'updateSelectedDate',
    'deleteRecord',
    'handleUpdateStatusSubmit',
    'toggleChangeAttendance',
    'toggleOff'].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  async componentWillMount() {
    await this.getAttendance();
    let attendanceInterval = setInterval(async () => {
      console.log('fetching attednance');
      await this.getAttendance();
    }, 30000);
    await this.getExistingUserList();
    this.setState({ attendanceInterval });
  }

  componentWillUnmount() {
    clearInterval(this.state.attendanceInterval);
  }

  async deleteRecord() {
    const momentDay = Moment().format("YYYY-MM-DD");
    await getAttendanceRecordDate({date: momentDay});
  }

  async getAttendance() {
    const queryType = {queryType: 'allAttendance'};
    const attendanceRecords = await getAttendanceRecords(queryType);   
    attendanceRecords.forEach((item) => {
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
      /* istanbul ignore else  */
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

  async getExistingUserList() {
    const users = await getAllUsers();
    this.setState({ studentOptions: users });
  }

  updateSelectedDate(e) {
    let date = Moment([e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes()]).format('YYYY-MM-DD HH:mm:ss');
    this.setState({ selectedDate: date });
  }

  async handleUpdateStatusSubmit(event) {
    if (this.state.selectedDate && this.state.selectedStudent && this.state.selectedStatus) {
      let data = {
        selectedDate: this.state.selectedDate,
        selectedStudent: this.state.selectedStudent,
        selectedStatus: this.state.selectedStatus
      };
      this.setState({ spinner: true, statusUpdated: false });
      this.setState({ statusUpdated: await changeAttendanceStatus(data) });
      this.setState({ spinner: false });
      await this.getAttendance();
      this.toggleOff('statusUpdated', 'selectedDate', 'selectedStudent', 'selectedStatus');
    } else {
      alert('Select Date and Student and Status!');
    }
  }

  toggleOff(status, ...states) {
    setTimeout(() => {
      this.setState({ [status]: false });
      states.forEach((state) => {
        this.setState({ [state]: false});
      });
    }, 5000);
  }

  toggleChangeAttendance() {
    this.setState({ changeNeeded: !this.state.changeNeeded });
  }

  render() {
    return (
      <div>

        <div className="attendance-page-form">
          <h3 className="text-center">Attendance Records</h3>

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
              dataField = 'cutoff_time'
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
              dataField = 'checkin_time'
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

          <hr/>

          <button className="login-button btn btn-primary" onClick={this.toggleChangeAttendance}>
            <span className="glyphicon glyphicon-edit"/> Edit Attendance
          </button>
        </div>

        <CSSTransitionGroup 
          transitionName="attendance-change"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={500}>
          {this.state.changeNeeded ? 
            <div className="col-md-5 attendance-page-form">
              <h3>Change Attendance Records</h3>

              Date:
              <DateTime
                onChange={this.updateSelectedDate}
                placeholder="Select Date..."
                time={false}
              />

              <br/>

              Student:
              <div onClick={!this.state.studentOptions.length && this.getExistingUserList}>
                <VirtualizedSelect
                  options={this.state.studentOptions ? this.state.studentOptions : [{ label: 'Error loading data..', value: '' }]}
                  onChange={selectedUser => this.setState({ selectedStudent: selectedUser })}
                  value={this.state.selectedStudent}
                  placeholder="Select Student..."
                />
              </div>

              <br/>

              Status:
              <div>
                <Select
                  simpleValue
                  value={this.state.selectedStatus}
                  placeholder="Select Status..."
                  options={this.state.statusOptions}
                  onChange={selected => this.setState({ selectedStatus: selected })}
                />
              </div>

              <br/>

              <button className="login-button btn btn-primary" onClick={this.handleUpdateStatusSubmit}>Submit Changes</button>
              <button className="deleteRecord btn btn-danger pull-right" onClick={this.deleteRecord}>Delete Today's Record</button>
              {!this.state.statusUpdated ? null : <h5>Changed {this.state.selectedStudent.label.slice(0, this.state.selectedStudent.label.indexOf('-') - 1)}'s attendance status for {Moment(this.state.selectedDate).format('dddd, MMMM Do, YYYY')} to '{this.state.selectedStatus}'!</h5>}
            </div>
          : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}
