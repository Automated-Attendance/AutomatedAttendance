import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTime from 'react-widgets/lib/DateTimePicker';
import Select from 'react-select';
import 'react-select/dist/react-select.css'

// init time localization for DateTimePicker
momentLocalizer(Moment);

export default class StartAttendance extends React.Component {
  render() {
    return (
      <div className="col-md-4 start-attendance-form">
        <h3 className="text-center">Start Daily Attendance</h3>
        <br/>
        <h5 className="form-title">Class:</h5>
        <div className="classSelect">
          <Select
            placeholder="Select Class(es)..."
            value={this.props.selectedClass}
            options={this.props.classOptions}
            onChange={this.props.handleChangeSelect}
            simpleValue
          />
        </div>
        <br/>
        <h5 className="form-title">Cutoff Time:</h5>
        <DateTime
          placeholder="Select Cutoff Time..."
          onChange={this.props.handleChangeTime}
          calendar={false}
          ref='DateTime'
        />
        <br/>
        <button
          className="populateAttendanceRecord login-button btn btn-primary"
          onClick={this.props.handleSubmit}
        >
          Start Today's Attendance
        </button>
        {!this.props.attendancePopulated ? null : 
          <h5>
            Populated daily attendance for {this.props.selectedClass} on {Moment(this.props.selectedTime).format('dddd, MMM Do, YYYY')}!<br/><br/>
            YOU MUST REMAIN ON THIS PAGE for the camera to continue monitoring attendance.<br/><br/>
            If you populated the wrong time, you can go to the Attendance page to delete today's records before resubmitting this form. 
          </h5>
        }
      </div>
    );
  }
};