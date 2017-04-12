import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';

Promise.promisifyAll(db);

exports.querySelector = (req, res, next) => {

  if (req.body.queryType === 'allAttendance') {
    req.params.query = `SELECT * FROM attendance_record
      JOIN users ON attendance_record.user_id=users.users_id
      JOIN class_user ON users.users_id=class_user.user_id
      JOIN classes ON classes.classes_id=class_user.class_id;`;
  } else if (req.body.queryType === 'studentAttendance') {
    req.params.query = `SELECT * FROM attendance_record
      JOIN users ON attendance_record.user_id=users.users_id
      JOIN class_user ON users.users_id=class_user.user_id
      JOIN classes ON classes.classes_id=class_user.class_id
      WHERE users.email='${req.body.email}';`;
  }

  next();
};

exports.queryDatabase = async (req, res) => {
  try {
    const result = await db.queryAsync(req.params.query);
    res.json(result[0]);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getAttendanceForUser = async (req, res) => {
  try {
    const queryString = `SELECT users.user_id, status, date, attendance_record.attendancerecord_id 
    FROM users RIGHT JOIN attendance_record on users.user_id=attendance_record.attendancerecord_id;`;
    const result = await db.queryAsync(queryString);
    res.json(result);
  } catch (err) {
    res.status(500).send(error);
  }
}

exports.getListOfUsers = async (req, res, next) => {
  try {
    const queryString = 'SELECT * from users;';
    const result = await db.queryAsync(queryString);
    req.params = result;
    next();
  } catch (err) {
    res.status(500).send(error);
  }
}

exports.getListOfUsersWithCertainClasses = async (req, res, next) => {
  try {
    let qs = ''
    req.body.classes.forEach((classes,index) => {
      if(index === req.body.classes.length - 1) {
        qs += `classes.class_name='${classes}'`
      } else {
        qs += `classes.class_name='${classes}' or `
      }
    })

    const queryString = `select * from users join class_user on users.users_id=class_user.user_id join classes on class_user.class_id=classes.classes_id where ${qs};`
    const result = await db.queryAsync(queryString);
    req.body.params = result;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}
