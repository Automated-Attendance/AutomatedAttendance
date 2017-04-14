import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';

Promise.promisifyAll(db);

exports.checkInUserOnTime = (req, res, next) => {
  try {
    const users = req.body.users;

    users.forEach(function (user) {
      let queryString = `UPDATE attendance_record SET status='On time' WHERE user_id='${user.id}'`;
      await db.queryAsync(queryString);
    });

    next();

  }catch (err) {
    res.status(500).send(err);
  }
}