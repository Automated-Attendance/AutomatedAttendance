import AttendanceModel from '../QueryModels/AttendanceModel';
import MomentTZ from 'moment-timezone';
import moment from 'moment';


const Attendance = new AttendanceModel();

exports.storeRecords = async (req, res) => {
  try {
    const { classes, time } = req.body;
    await Attendance.storeRecords(classes, time);

    // sending out warning emails 10mins before the time
    let warningEmail = setInterval( ()=> {
      let warningTime = moment(time).subtract(10, 'minute');
      let currentTime = moment();
      let currentTimeString = currentTime.format('h:mm');
      let recordedTimeString = warningTime.format('h:mm');

      console.log( 'currentTimeString', currentTimeString );
      console.log('recordedTimeString', recordedTimeString );

      if(currentTimeString === recordedTimeString) {
        const pendingStudents = Attendance.emailWarningStudents();
        clearInterval(warningEmail);
      }
    }, 5000);

    //sending out late emails 
    var absentInterval = setInterval( () => {
      // let currentTime = MomentTZ.tz(new Date(), "America/Los_angeles").format();
      let currentTime = moment();
      console.log('currentTime', currentTime, '===', 'time', time)
      if(currentTime > time) {
        const pendingStudents = Attendance.emailLateStudents();
        clearInterval(absentInterval);
      };
    }, 5000);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.getRecords = async (req, res) => {
  try {
    let result, { type, email } = req.query;
    if (type === 'allAttendance') {
      [result] = await Attendance.getAllRecords();
    } else {
      [result] = await Attendance.getStudentRecord(email);
    }
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.emailLateStudents = async (req, res) => {
  try {
    await Attendance.emailLateStudents();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.removeAttendanceRecordDate = async (req, res) => {
  try {
    await Attendance.deleteRecordDate(req.query);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message)
  }
}

exports.emailStudentsWarning = async (req, res) => {

};