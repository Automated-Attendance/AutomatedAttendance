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
  var queryString = 'SELECT users.name,status,date,AttendanceRecord.id FROM users RIGHT JOIN AttendanceRecord on users.id=AttendanceRecord.user_id;';
  db.query(queryString, function(error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(result);
    }
  });
}
