import React from 'react';
import { getAttendanceRecords } from './requests/classes';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import tableHelpers from './helpers/tableHelpers.js'

export default class Student extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      classes: {},
      emails: {},
      statuses: {}
    };
  }

  async componentWillMount() {
    this.getAttendance.bind(this);
  }

  async getAttendance() {
    const userEmail = this.props.userPrivs.userEmail;
    const attendanceRecords = await getAttendanceRecords({email: this.props.userPrivs.userEmail, queryType: 'studentAttendance'});
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
      if (!this.state.emails[item.email]) {
        let thisEmail = this.state.emails;
        thisEmail[item.email] = item.email;
        this.setState({
          emails: thisEmail,
        });
      }
    });
    this.setState({attendance: attendanceRecords});
  }

  render() {
    return (
      <div>
        <BootstrapTable data={this.state.attendance} height='250px' scrollTop={'Top'} striped hover condensed>
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
      </div>
    );
  }
}
