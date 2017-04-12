import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';

Promise.promisifyAll(db);

exports.insertAttendanceRecord = async (req, res) => {
  try {
    console.log('REQ>BODY',req.body.params[0].length);

    req.body.params[0].forEach(function (user) {
      let id =user.user_id;
      let status = 'Absent';
      let add = `INSERT INTO attendance_record(status, user_id) VALUES ('${status}', '${id}');`

      db.queryAsync(add);
    })

    res.status(201).send();
  } catch (err) {
    console.warn(err);
  }
}