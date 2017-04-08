import mysql from 'mysql';
import db from './index.js';

exports.searchDB = function(req, res) {
  var queryString = 'SELECT * FROM users;';
  db.query(queryString, function(error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(result);
    }
  });
}
