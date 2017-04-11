import React from 'react';
import { getStudentData } from './requests/students';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



export default class Student extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount () {
    const userEmail = this.props.userPrivs.userEmail;
    const data = await getStudentData({ email: this.props.userPrivs.userEmail, queryType: 'studentAttendance' });
    this.setState({ data: data });
  }
  

  render() {
    return (
      <div>
        <BootstrapTable data={this.state.data} height='250px' scrollTop={'Top'} striped hover condensed>
          <TableHeaderColumn dataField='class_name' isKey filter={{type: 'TextFilter'}} dataSort={true}>Class</TableHeaderColumn>
          <TableHeaderColumn dataField='date' filter={{type: 'TextFilter'}} dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='status' filter={{type: 'TextFilter'}} dataSort={true}>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
