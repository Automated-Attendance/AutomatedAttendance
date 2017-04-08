import mysql from 'mysql';
import db from './index.js';

exports.searchDB = function(req, res) {
  console.log('searchDB');
  var queryString = 'SELECT * FROM users;';
  db.query(queryString, function(error, result) {
    if (error) {
      console.log('error searching database');
    }
    console.log('success');
    console.log(result);
    res.json(result);
  });
}
