import React from 'react';
import { getStudentData } from './requests/students';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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

  async componentDidMount () {
    const userEmail = this.props.userPrivs.userEmail;
    const attendanceRecords = await getStudentData({email: this.props.userPrivs.userEmail, queryType: 'studentAttendance'});
    attendanceRecords.forEach((item) => {
      item.date = this.parseDateAndTime(item.date);
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
  
  parseDateAndTime(oldDate) {
    var newDate = {
      year: oldDate.slice(0, 4),
      month: oldDate.slice(5, 7),
      day: oldDate.slice(8, 10),
      hour: oldDate.slice(11, 13),
      minute: oldDate.slice(14, 16),
      second: oldDate.slice(17, 19),
      millisecond: oldDate.slice(20, 23)
    };
    newDate.month--;
    newDate.hour -= 7;
    if (newDate.hour < 0) {
      newDate.hour += 24;
      newDate.day -= 1;
    }
    return new Date(
      newDate.year,
      newDate.month,
      newDate.day,
      newDate.hour,
      newDate.minute,
      newDate.second,
      newDate.millisecond
    );
  }

  monthNumToText(month) {
    if (month === 0) {
      return 'January';
    } else if (month === 1) {
      return 'February';
    } else if (month === 2) {
      return 'March';
    } else if (month === 3) {
      return 'April';
    } else if (month === 4) {
      return 'May';
    } else if (month === 5) {
      return 'June';
    } else if (month === 6) {
      return 'July';
    } else if (month === 7) {
      return 'August';
    } else if (month === 8) {
      return 'September';
    } else if (month === 9) {
      return 'October';
    } else if (month === 10) {
      return 'November';
    } else if (month === 11) {
      return 'December';
    }
  }

  dayNumToText(day) {
    if (day === 0) {
      return 'Sunday';
    } else if (day === 1) {
      return 'Monday';
    } else if (day === 2) {
      return 'Tuesday';
    } else if (day === 3) {
      return 'Wednesday';
    } else if (day === 4) {
      return 'Thursday';
    } else if (day === 5) {
      return 'Friday';
    } else if (day === 6) {
      return 'Saturday';
    }
  }

  dateFormatter(cell) {
    return `${this.dayNumToText(cell.getDay())}, ${this.monthNumToText(cell.getMonth())} ${cell.getDate()}, ${cell.getFullYear()}`;
  }

  timeFormatter(cell) {
    var suffix;
    var hours = cell.getHours();
    var minutes = cell.getMinutes();
    if (hours >= 12) {
      suffix = 'PM';
      hours -= 12;
    } else {
      suffix = 'AM';
    }
    if (hours === 0) {
      hours = 12;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes} ${suffix}`;
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
            dataField = 'date'
            width = '30%'
            dataAlign = 'right'
            dataFormat = {this.dateFormatter.bind(this)}
            dataSort
            filter = {{
              type: 'TextFilter',
            }}
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField = 'date'
            width = '15%'
            dataAlign = 'right'
            dataSort
            dataFormat = {this.timeFormatter}
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
