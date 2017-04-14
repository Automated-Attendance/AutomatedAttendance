import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';

Promise.promisifyAll(db);

exports.insertAbsentRecord = async (req, res, next) => {
  try {
    // results[].forEach(function (element) {})
    var lateUsers = req.body.usersInformation;
    lateUsers.forEach( (user) => {
      db.queryAsync(`UPDATE attendance_record SET status='Absent' WHERE user_id='${user.user_id}'`);
    });
    next();

  } catch (err) {
    console.warn(err);
  }
}
