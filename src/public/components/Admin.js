import React from 'react';
import { Link } from 'react-router-dom';
import { getAttendanceRecords } from './requests/classes';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: []
    };
  }

  async componentWillMount() {
    const queryType = {queryType: 'allAttendance'};
    const attendanceRecords = await getAttendanceRecords(queryType);
    this.setState({ attendance: attendanceRecords });
    // try {
    //   const { data } = await post('search', {queryType: 'allAttendance'})
    //   data.forEach((item) => {
    //     let timeStartIndex = item.date.indexOf('T');
    //     let hour = item.date.slice(++timeStartIndex, timeStartIndex + 2) - 7;
    //     let suffix = 'AM';
    //     if (hour > 12) {
    //       hour -= 12;
    //       suffix = 'PM';
    //     } else if (hour < 1) {
    //       hour += 12;
    //       suffix = 'PM';
    //     }
    //     item.time = `${hour}${item.date.slice(timeStartIndex + 2, timeStartIndex + 8)} ${suffix}`;
    //     item.date = item.date.slice(0, 10);
    //   })
    //   this.setState({attendance: data});
    // } catch (err) {
    //   console.log(err);
    // }
  }

  render() {
    return (
      <div>

        <BootstrapTable data={this.state.attendance} height='250px' scrollTop={'Top'} striped hover condensed>
          <TableHeaderColumn dataField='class_name' isKey filter={{type: 'TextFilter'}} dataSort={true}>Class</TableHeaderColumn>
          <TableHeaderColumn dataField='user_name' filter={{type: 'TextFilter'}} dataSort={true}>Student</TableHeaderColumn>
          <TableHeaderColumn dataField='date' filter={{type: 'TextFilter'}} dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='time' dataSort={true}>Time</TableHeaderColumn>
          <TableHeaderColumn dataField='status' filter={{type: 'TextFilter'}} dataSort={true}>Status</TableHeaderColumn>
        </BootstrapTable>

        <Link to="/AddStudent">Add Student</Link>
      </div>
    );
  }
}
