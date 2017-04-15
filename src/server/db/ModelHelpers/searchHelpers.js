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
