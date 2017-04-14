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
