import mysql from 'mysql';
import Promise from 'bluebird';
import db from './index.js';
import { galleryRemoveUser } from '../kairosFR/kairosHelpers';

Promise.promisifyAll(db);

exports.removeClassFromClassUser = async (req, res, next) => {
  try {
    let className = req.body.className;
    const queryString = `DELETE FROM class_user WHERE class_id= (SELECT classes_id FROM classes WHERE class_name = '${className}')`;
    await db.queryAsync(queryString);
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.removeClassFromClasses = async (req, res) => {
  try {
    let className = req.body.className;
    const queryString = `DELETE FROM classes WHERE class_name = '${className}'`;
    await db.queryAsync(queryString);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.removeUserFromClass = async (req, res) => {
   try {
    let studentUserName = req.body.studentUserName;
    let className = req.body.className;
    const queryString = `DELETE FROM class_user WHERE user_id = (SELECT users_id FROM users WHERE user_name='${studentUserName}') AND class_id = (SELECT classes_id FROM classes WHERE class_name = '${className}')`;
    await db.queryAsync(queryString);
    const result = await galleryRemoveUser(studentUserName, className);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
