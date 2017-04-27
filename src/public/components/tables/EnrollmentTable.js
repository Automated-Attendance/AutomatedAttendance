import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {nameSort} from '../../helpers/tableHelpers.js';

export default class EnrollmentTable extends React.Component {
  render() {
    return (
      <div>
        <h3>Student Enrollments</h3>
        <BootstrapTable
          data={this.props.enrollments}
          csvFileName={'StudentEnrollments.csv'}
          maxHeight='750px'
          scrollTop={'Top'}
          multiColumnSort={2}
          striped
          hover
          condensed
          exportCSV
        >
          <TableHeaderColumn
            isKey
            dataField='class'
            width='50%'
            filter={{type: 'SelectFilter', options: this.props.classOptions}}
            filterFormatted
            dataSort
          >
            Class
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='student'
            width='50%'
            filter={{type: 'TextFilter'}}
            sortFunc={nameSort}
            filterFormatted
            dataSort
          >
            Student
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
};