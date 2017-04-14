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