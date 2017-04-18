import AttendanceModel from '../QueryModels/AttendanceModel';
import MomentTZ from 'moment-timezone';


const Attendance = new AttendanceModel();

exports.storeRecords = async (req, res) => {
  try {
    const { classes, time } = req.body;
    await Attendance.storeRecords(classes, time);

    var start = setInterval( () => {
      let currentTime = MomentTZ.tz(new Date(), "America/Los_angeles").format();
      console.log('setting interval!!')
      if(currentTime > time) {
        const pendingStudents = Attendance.emailLateStudents();
        clearInterval(start);
      };

    }, 15000);

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
    await Attendance.deleteRecordDate(req.body);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message)
  }
}

exports.emailStudentsWarning = async (req, res) => {

};