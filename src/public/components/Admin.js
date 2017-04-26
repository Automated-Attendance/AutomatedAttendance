import React from 'react';
import Moment from 'moment';
import Spinner from './Spinner';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {getAllUsers} from '../requests/users';
import {changeAttendanceStatus} from '../requests/students';
import {populateTableRecords, populateTableRecordDate} from '../requests/classes';
import AllAttendanceTable from './tables/AllAttendanceTable';
import EditAttendance from './EditAttendance';
import 'react-select/dist/react-select.css';
import 'react-widgets/lib/less/react-widgets.less';

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
      spinner: false,
      changeNeeded: false,
      attendanceInterval: null,
      studentOptions: [],
      statusOptions: [
        {label: 'On time', value: 'On time'},
        {label: 'Tardy', value: 'Tardy'},
        {label: 'Absent', value: 'Absent'},
        {label: 'Pending', value: 'Pending'}
      ]
    };

    ['populateTable',
    'getStudentOptions',
    'handleChangeDate',
    'handleChangeSelect',
    'handleSubmitUpdateStatus',
    'deleteRecord',
    'toggleEditAttendance',
    'toggleOff'].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  async componentWillMount() {
    await this.populateTable();
    let attendanceInterval = setInterval(async () => {
      await this.populateTable();
    }, 30000);
    await this.getStudentOptions();
    this.setState({attendanceInterval});
  }

  componentWillUnmount() {
    clearInterval(this.state.attendanceInterval);
  }

  async populateTable() {
    const queryType = {queryType: 'allAttendance'};
    const attendanceRecords = await populateTableRecords(queryType);
    attendanceRecords.forEach(item => {
      if (!this.state.classes[item.class_name]) {
        let thisClass = this.state.classes;
        thisClass[item.class_name] = item.class_name;
        this.setState({classes: thisClass});
      }
      if (!this.state.statuses[item.status]) {
        let thisStatus = this.state.statuses;
        thisStatus[item.status] = item.status;
        this.setState({statuses: thisStatus});
      }
      let fullName = `${item.first_name} ${item.last_name}`;
      item.full_name = fullName;
      /* istanbul ignore else  */
      if (!this.state.emails[item.email]) {
        let thisEmail = this.state.emails;
        let thisStudent = this.state.students;
        thisEmail[item.email] = item.email;
        thisStudent[fullName] = fullName;
        this.setState({emails: thisEmail, students: thisStudent});
      }
    });
    this.setState({attendance: attendanceRecords});
  }

  async getStudentOptions() {
    const users = await getAllUsers();
    this.setState({studentOptions: users});
  }

  handleChangeDate(e) {
    let date = Moment([e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes()]).format('YYYY-MM-DD HH:mm:ss');
    this.setState({selectedDate: date});
  }

  handleChangeSelect(state, selection) {
    this.setState({[state]: selection});
  }

  async handleSubmitUpdateStatus() {
    if (this.state.selectedDate && this.state.selectedStudent && this.state.selectedStatus) {
      let data = {
        selectedDate: this.state.selectedDate,
        selectedStudent: this.state.selectedStudent,
        selectedStatus: this.state.selectedStatus
      };
      this.setState({spinner: true, statusUpdated: false});
      this.setState({statusUpdated: await changeAttendanceStatus(data)});
      this.setState({spinner: false});
      await this.populateTable();
      this.toggleOff('statusUpdated', 'selectedDate', 'selectedStudent', 'selectedStatus');
    } else {
      alert('Select Date and Student and Status!');
    }
  }

  async deleteRecord() {
    const momentDay = Moment().format("YYYY-MM-DD");
    await populateTableRecordDate({date: momentDay});
  }

  toggleEditAttendance() {
    this.setState({changeNeeded: !this.state.changeNeeded});
  }

  toggleOff(status, ...states) {
    setTimeout(() => {
      this.setState({[status]: false});
      states.forEach(state => {
        this.setState({[state]: false});
      });
    }, 5000);
  }

  render() {
    return (
      <div className="container">
        <div className="attendance-page-form">
          <h3 className="text-center">Attendance Records</h3>
          <hr/>
          <AllAttendanceTable
            attendance={this.state.attendance}
            classes={this.state.classes}
            statuses={this.state.statuses}
          />
          <button
            className="login-button btn btn-primary"
            onClick={this.toggleEditAttendance}
          >
            <span className="glyphicon glyphicon-edit"/>
            Edit Attendance
          </button>
        </div>
        <CSSTransitionGroup 
          transitionName="attendance-change"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={500}
        >
          {this.state.changeNeeded ? 
            <EditAttendance
              statusUpdated={this.state.statusUpdated}
              selectedStudent={this.state.selectedStudent}
              selectedStatus={this.state.selectedStatus}
              studentOptions={this.state.studentOptions}
              statusOptions={this.state.statusOptions}
              handleChangeDate={this.handleChangeDate}
              handleChange={this.handleChangeSelect}
              handleSubmit={this.handleSubmitUpdateStatus}
              deleteRecord={this.deleteRecord}
            /> :
            null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
};