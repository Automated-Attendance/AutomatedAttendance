import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import tableHelpers from '../../helpers/tableHelpers.js';

export default class StudentAttendanceTable extends React.Component {
  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.attendance}
          csvFileName={'MyAttendance.csv'}
          maxHeight='750px'
          scrollTop={'Top'}
          multiColumnSort={5}
          striped
          hover
          condensed
          exportCSV
        >
          <TableHeaderColumn
            isKey
            dataField='class_name'
            width='15%'
            filter={{type: 'SelectFilter', options: this.props.classes}}
            filterFormatted
            dataSort
          >
            Class
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='cutoff_time'
            width='40%'
            dataAlign='right'
            dataFormat={tableHelpers.dateFormatter}
            filter={{type: 'TextFilter'}}
            filterFormatted
            dataSort
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='cutoff_time'
            width='15%'
            dataAlign='right'
            dataFormat={tableHelpers.timeFormatter}
            filter={{type: 'TextFilter'}}
            filterFormatted
            dataSort
          >
            Cutoff Time
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='checkin_time'
            width='15%'
            dataAlign='right'
            dataFormat={tableHelpers.timeFormatter}
            dataSort
          >
            Checkin Time
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='status'
            width='15%'
            filter={{type: 'SelectFilter', options: this.props.statuses}}
            filterFormatted
            dataSort
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
};