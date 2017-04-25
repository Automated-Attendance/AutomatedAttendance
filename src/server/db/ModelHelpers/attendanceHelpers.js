import AttendanceModel from '../QueryModels/AttendanceModel';
import moment from 'moment';


const Attendance = new AttendanceModel();

exports.storeRecords = async ({ body }, res) => {
  try {
    const { classes, time } = body;
    await Attendance.storeRecords(classes, time);
    // sending out warning emails 10mins before the time (impossible to test)
    /* istanbul ignore next */
    const warningEmail = setInterval(() => {
      const warningTime = moment(time).subtract(5, 'minute');
      const currentTime = moment();
      const currentTimeString = currentTime.format('h:mm');
      const recordedTimeString = warningTime.format('h:mm');
      if (currentTimeString === recordedTimeString) {
        Attendance.emailWarningStudents();
        clearInterval(warningEmail);
      }
    }, 5000);

    //sending out late emails (impossible to test)
    /* istanbul ignore next */
    const absentInterval = setInterval(() => {
      const currentTime = moment();
      if (currentTime.isAfter(time)) {
        // still send late emails 
        // leave all late students to be pending;
       Attendance.emailStudentAboutToBeTardy();
        clearInterval(absentInterval);
      };
    }, 5000);

    const tardyInterval = setInterval(() => {
      const currentTime = moment();
      const tardyEmail = moment(time).add(10, 'minute');
      if( currentTime.isAfter(tardyEmail)) {
        // in here i want everyone to finally be absent
        Attendance.emailLateStudents();
        clearInterval(tardyInterval);
      }

    }, 5000)

    res.sendStatus(201);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
}

exports.getRecords = async ({ query }, res) => {
  try {
    let result, { type, email } = query;
    if (type === 'allAttendance') {
      [result] = await Attendance.getAllRecords();
    } else {
      [result] = await Attendance.getStudentRecord(email);
    }
    res.json(result);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
}

exports.emailLateStudents = async (req, res) => {
  try {
    await Attendance.emailLateStudents();
    res.sendStatus(200);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
}

exports.removeAttendanceRecordDate = async ({ query }, res) => {
  try {
    await Attendance.deleteRecordDate(query);
    res.sendStatus(202);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
}

exports.changeAttendanceStatus = async ({ body }, res) => {
  try {
    let { data } = body
    await Attendance.updateAttendanceStatus(data);
    res.sendStatus(201);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
}