import mysql from 'mysql';
import db from './index.js';

exports.querySelector = function(req, res, next) {

  if (req.body.queryType === 'allAttendance') {
    req.params.query = `SELECT * FROM attendance_record\
      JOIN users ON attendance_record.user_id=users.users_id\
      JOIN class_user ON users.users_id=class_user.user_id\
      JOIN classes ON classes.classes_id=class_user.class_id;`;
  } else if (req.body.queryType === 'studentAttendance') {
    req.params.query = `SELECT * FROM attendance_record\
      JOIN users ON attendance_record.user_id=users.users_id\
      JOIN class_user ON users.users_id=class_user.user_id\
      JOIN classes ON classes.classes_id=class_user.class_id\
      WHERE users.email='${req.body.email}';`;
  }

  next();
}

exports.queryDatabase = function(req, res) {
  console.log('queryDatabase params:', req.params);
  db.query(req.params.query, function(error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(result);
    }
  });
}


exports.getAttendanceForUser = function(req, res) {
  var queryString = 'SELECT users.user_id, status, date, attendance_record.attendancerecord_id FROM users RIGHT JOIN attendance_record on users.user_id=attendance_record.attendancerecord_id;';
  db.query(queryString, function(error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(result);
    }
  });
}
