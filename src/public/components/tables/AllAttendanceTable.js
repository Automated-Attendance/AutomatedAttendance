import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import tableHelpers from '../../helpers/tableHelpers.js';

export default class AllAttendanceTable extends React.Component {
  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.attendance}
          csvFileName={'Attendance.csv'}
          maxHeight='750px'
          scrollTop={'Top'}
          multiColumnSort={6}
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
            dataField='full_name'
            width='20%'
            filter={{type: 'TextFilter'}}
            sortFunc={tableHelpers.nameSort}
            filterFormatted
            dataSort
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='cutoff_time'
            width='20%'
            dataAlign='right'
            filter={{type: 'TextFilter'}}
            dataFormat={tableHelpers.dateFormatter}
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
            dataSort
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='checkin_time'
            width='15%'
            dataAlign='right'
            dataFormat={tableHelpers.timeFormatter}
            dataSort
          >
            Time
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