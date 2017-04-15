import mysql from 'mysql';
import Promise from 'bluebird';
import db from '../index';
import SearchModel from '../QueryModels/SearchModel';

Promise.promisifyAll(db);
const Search = new SearchModel();

exports.getAllUsernames = async (req, res) => {
  try {
    const [result] = await Search.getFirstLastGithubNames();
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// idk what this is for
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

exports.getEnrollment = async (req, res) => {
  try {
    let enrollmentQuery = `SELECT * FROM classes
      RIGHT JOIN class_user ON classes.classes_id=class_user.class_id
      LEFT JOIN users ON class_user.user_id=users.users_id`;
    const enrollment = await db.queryAsync(enrollmentQuery)
    console.log('enrollment', enrollment);
    res.status(201).send(enrollment);
  }
  catch (err) {
    res.status(500).send(err);
  }
}
