import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';
import SearchModel from './QueryModels/SearchModel';

Promise.promisifyAll(db);
const Search = new SearchModel();

exports.getAllUsernames = async (req, res) => {
  try {
    const result = await Search.getFirstLastGithubNames();
    res.json(result[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.getAttendanceRecords = async (req, res) => {
  try {
    let result, { type, email } = req.query;
    if (type === 'allAttendance') {
      result = await Search.getAllRecords();
    } else {
      result = await Search.getStudentRecord(email);
    }
    res.json(result[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

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
