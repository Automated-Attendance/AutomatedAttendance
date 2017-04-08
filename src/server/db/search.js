import mysql from 'mysql';
import db from './index.js';

exports.searchDB = function(req, res) {
  var queryString = 'SELECT * FROM users;';
  db.query(queryString, function(error, result) {
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
