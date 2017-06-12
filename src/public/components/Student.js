import React from 'react';
import {getAttendanceRecords} from '../requests/classes';
import StudentAttendanceTable from './tables/StudentAttendanceTable';
import { connect } from 'react-redux';

class Student extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      attendance: [],
      classes: {},
      statuses: {},
      attendanceInterval: null
    };

    this.getAttendance = this.getAttendance.bind(this);
  }

  async componentWillMount() {
    await this.getAttendance();
    let attendanceInterval = setInterval(async () => {
      await this.getAttendance();
    }, 5000);
    this.setState({attendanceInterval});
  }

  componentWillUnmount() {
    clearInterval(this.state.attendanceInterval);
  }

  async getAttendance() {
    const userEmail = this.props.userEmail;
    const attendanceRecords = await getAttendanceRecords({email: this.props.userEmail, queryType: 'studentAttendance'});
    attendanceRecords.forEach(item => {
      /* istanbul ignore else  */
      if (!this.state.classes[item.class_name]) {
        let thisClass = this.state.classes;
        thisClass[item.class_name] = item.class_name;
        this.setState({classes: thisClass});
      }
      /* istanbul ignore else  */
      if (!this.state.statuses[item.status]) {
        let thisStatus = this.state.statuses;
        thisStatus[item.status] = item.status;
        this.setState({statuses: thisStatus});
      }
      let fullName = `${item.first_name}${item.last_name !== 'undefined' ? ' ' + item.last_name : ''}`;
      item.full_name = fullName;
    });
    this.setState({attendance: attendanceRecords});
  }

  render() {
    return (
      <div className="attendance-page-form container">
        <h3 className="text-center">My Attendance History</h3>
        <hr/>
        <StudentAttendanceTable
          attendance={this.state.attendance}
          classes={this.state.classes}
          statuses={this.state.statuses}
        />
      </div>
    );
  }
}

function mapStateToProps({ userStatus }) {
  return {
    userEmail: userStatus.userEmail
  };
}

export default connect(mapStateToProps)(Student);
