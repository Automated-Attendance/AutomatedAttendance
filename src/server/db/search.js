import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';
import SearchModel from './QueryModels/SearchModel';

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

exports.getAllUsers = async (req, res) => {
  const result = await Search.getFirstLastGithubNames();
  res.json(result[0]);
}

exports.queryDatabase = async (req, res) => {
  try {
    if (!req.params.query) req.params.query = `SELECT first_name, last_name, user_name FROM users`;
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
    res.status(500).send(err);
  }
};

exports.getListOfUsers = async (req, res, next) => {
  try {
    const queryString = 'SELECT * from users;';
    const result = await db.queryAsync(queryString);
    req.params = result;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getListOfUsersWithCertainClasses = async (req, res, next) => {
  try {
    let qs = ''
    req.body.classes.forEach((classes,index) => {
      if(index === req.body.classes.length - 1) {
        qs += `classes.class_name='${classes}'`
      } else {
        qs += `classes.class_name='${classes}' or `
      }
    });

    const queryString = `SELECT * FROM users JOIN class_user on users.users_id=class_user.user_id
    JOIN classes on class_user.class_id=classes.classes_id WHERE ${qs};`
    const result = await db.queryAsync(queryString);
    req.body.params = result;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSpecificUser = async (req, res, next) => {
  try {
    let { matches } = req.body;
    let qs = '';
    matches.forEach(function (user, index) {
      qs += index === matches.length - 1 ? `user_name='${user.transaction.subject_id}';` 
      : `user_name='${user.transaction.subject_id}' or `;
    });
    const queryString = `SELECT email FROM users where ${qs}`;
    const result = await db.queryAsync(queryString);
    req.body.users = result[0];
    next();
  } catch (err) {  
    res.status.send(err);
  }
};

exports.getPendingUsers = async (req, res, next) => {
  try {
    let queryString = `SELECT * FROM attendance_record WHERE status='Pending'`;
    let result = await db.queryAsync(queryString);
    req.body.usersInformation = result[0];
    next();

  } catch (err) {
    res.status(500).send(err)
  }
};

exports.getLateUsers = async (req, res, next) => {
  try {
    let queryString = `select users.email, users.first_name from users Right JOIN attendance_record ON users.users_id=attendance_record.user_id;`;
    let result = await db.queryAsync(queryString);
    req.body.userEmails = result[0];

    next();
  }catch (err) {
    res.status.send(err);
  }
}
