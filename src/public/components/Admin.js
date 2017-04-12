import React from 'react';
import { Link } from 'react-router-dom';
import { getAttendanceRecords } from './requests/classes';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      classes: {},
      students: {},
      emails: {},
      statuses: {}
    };
  }

  async componentWillMount() {
    const queryType = {queryType: 'allAttendance'};
    const attendanceRecords = await getAttendanceRecords(queryType);      
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
        let thisStudent = this.state.students;
        thisEmail[item.email] = item.email;
        thisStudent[fullName] = fullName;
        this.setState({
          emails: thisEmail,
          students: thisStudent
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

  nameSort(a, b, order) {
    if (order === 'desc') {
      if (a.last_name !== b.last_name) {
        return a.last_name.localeCompare(b.last_name) * -1;
      } else {
        return a.first_name.localeCompare(b.first_name) * -1;
      }
    } else {
      if (a.last_name !== b.last_name) {
        return b.last_name.localeCompare(a.last_name) * -1;
      } else {
        return b.first_name.localeCompare(a.first_name) * -1;
      }
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
        <br></br>
        <a href='/AddStudent'><button>Add Student/Class</button></a>
        <BootstrapTable
          data = {this.state.attendance}
          csvFileName = {'Attendance.csv'}
          maxHeight = '750px'
          scrollTop = {'Top'}
          multiColumnSort = {5}
          striped
          hover
          condensed
          exportCSV
        >
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
            dataField = 'full_name'
            width = '25%'
            dataSort
            sortFunc = {this.nameSort}
            filterFormatted
            filter = {{
              type: 'TextFilter'
            }}
          >
            Name
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
