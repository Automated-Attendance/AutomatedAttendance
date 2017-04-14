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

// about to be deprecated
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
