import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';

Promise.promisifyAll(db);

exports.insertAttendanceRecord = async (req, res) => {
  try {
    let users = req.body.params[0];
    users.forEach(async (user) => {
      let result = await db.queryAsync(`SELECT date FROM attendance_record WHERE user_id='${user.user_id}'`);
      if (result[0].length) {
        let existingDay = new Date(result[0][0].date).getDay();
        let currentDay = new Date().getDay();
        if (existingDay !== currentDay) {
          db.queryAsync(`INSERT INTO attendance_record(status, user_id) VALUES ('Absent', '${user.user_id}');`);
        }
      } else {
        db.queryAsync(`INSERT INTO attendance_record(status, user_id) VALUES ('Absent', '${user.user_id}');`);
      }
    });
    res.status(201).send();
  } catch (err) {
    console.warn(err);
  }
}
