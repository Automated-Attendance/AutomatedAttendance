import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTime from 'react-widgets/lib/DateTimePicker';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

// init time localization for DateTimePicker
momentLocalizer(Moment);

export default class EditAttendance extends React.Component {
  render() {
    return (
      <div className="col-md-5 attendance-page-form">
        <h3 className="text-center">Edit Attendance Records</h3>
        Date:
        <DateTime
          placeholder="Select Date..."
          onChange={this.props.handleChangeDate}
          time={false}
        />
        <br/>
        Student:
        <div>
          <VirtualizedSelect
            placeholder="Select Student..."
            value={this.props.selectedStudent}
            options={this.props.studentOptions ? this.props.studentOptions : [{label: 'Error loading data...'}]}
            onChange={selectedStudent => this.props.handleChange('selectedStudent', selectedStudent)}
          />
        </div>
        <br/>
        Status:
        <div>
          <Select
            placeholder="Select Status..."
            value={this.props.selectedStatus}
            options={this.props.statusOptions}
            onChange={selectedStatus => this.props.handleChange('selectedStatus', selectedStatus)}
            simpleValue
          />
        </div>
        <br/>
        <button
          className="btn btn-success"
          onClick={this.props.handleSubmit}
        >
          <span className="glyphicon glyphicon-ok"/>
          Submit Changes
        </button>
        <button
          className="deleteRecord btn btn-danger pull-right"
          onClick={() => {
            let proceed = confirm('Are you sure?\nThis will delete all attendance records for today!');
            if (proceed) {
              this.props.deleteRecord();
            }
          }}
        >
          <span className="glyphicon glyphicon-trash"/>
          Delete Today's Record
        </button>
        {!this.props.statusUpdated ? null : <h5>Changed {this.props.selectedStudent.label.slice(0, this.props.selectedStudent.label.indexOf('-') - 1)}'s attendance status for {Moment(this.props.selectedDate).format('dddd, MMMM Do, YYYY')} to '{this.props.selectedStatus}'!</h5>}
        {!this.props.recordDeleted ? null : <h5>Deleted today's attendance records for all classes!</h5>}
      </div>
    );
  }
};