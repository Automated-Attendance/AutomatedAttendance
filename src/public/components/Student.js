import React from 'react';
import { connect } from 'react-redux';
import { getAttendance } from '../actions/StudentRecordActions';
import StudentAttendanceTable from './tables/StudentAttendanceTable';

class Student extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      attendanceInterval: null
    };
  }

  async componentWillMount() {
    this.props.getAttendance(this.props.userEmail)
    const attendanceInterval = setInterval(async () => {
      this.props.getAttendance(this.props.userEmail)
    }, 5000);
    this.setState({ attendanceInterval });
  }

  componentWillUnmount() {
    clearInterval(this.state.attendanceInterval);
  }

  render() {
    const { attendance, classes, statuses } = this.props;
    return (
      <div className="attendance-page-form container">
        <h3 className="text-center">My Attendance History</h3>
        <hr/>
        <StudentAttendanceTable
          attendance={attendance}
          classes={classes}
          statuses={statuses}
        />
      </div>
    );
  }
}

function mapStateToProps({ userStatus, studentRecords }) {
  const { attendance, classes, statuses } = studentRecords;
  return {
    attendance,
    classes,
    statuses,
    userEmail: userStatus.userEmail
  };
}

export default connect(mapStateToProps, { getAttendance })(Student);
