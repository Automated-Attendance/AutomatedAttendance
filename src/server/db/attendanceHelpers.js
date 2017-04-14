import AttendanceModel from './QueryModels/AttendanceModel';

const Attendance = new AttendanceModel();

exports.storeRecords = async (req, res) => {
  try {
    const { classes } = req.body;
    await Attendance.storeRecords(classes);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.getRecords = async (req, res) => {
  try {
    let result, { type, email } = req.query;
    if (type === 'allAttendance') {
      result = await Attendance.getAllRecords();
    } else {
      result = await Attendance.getStudentRecord(email);
    }
    res.json(result[0]);
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