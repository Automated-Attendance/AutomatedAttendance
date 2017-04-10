import React from 'react';
import { Link } from 'react-router-dom';
import { getAttendanceRecords } from './requests/classes';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['HRSF72', 'HRSF73', 'HRSF75', 'HRSF76'],
      students: {
        'HRSF72': ['Duy', 'Jason', 'Andrew', 'Han'],
        'HRSF73': ['Sam', 'Aly', 'James', 'Kay'],
        'HRSF75': ['Kevin', 'John', 'Greg', 'Mario'],
        'HRSF76': ['Alice', 'Jenny', 'Andy', 'Terry']
      },
      selectedClass: '',
      attendance: []
    };
  }

  async componentWillMount() {
    const queryType = {queryType: 'allAttendance'};
    const attendanceRecords = await getAttendanceRecords(queryType);
    this.setState({ attendance: attendanceRecords });
  }

  handleClassListChange(currentClass){
    this.setState({
      selectedClass: currentClass
    })
  }

  render() {
    return (
      <div>

        <BootstrapTable data={this.state.attendance} height='250px' scrollTop={'Top'} striped hover condensed>
          <TableHeaderColumn dataField='class_name' isKey filter={{type: 'TextFilter'}} dataSort={true}>Class</TableHeaderColumn>
          <TableHeaderColumn dataField='user_name' filter={{type: 'TextFilter'}} dataSort={true}>Student</TableHeaderColumn>
          <TableHeaderColumn dataField='date' filter={{type: 'TextFilter'}} dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='status' filter={{type: 'TextFilter'}} dataSort={true}>Status</TableHeaderColumn>
        </BootstrapTable>

        <Link to="/AddStudent">Add Student</Link>
      </div>
    );
  }
}
