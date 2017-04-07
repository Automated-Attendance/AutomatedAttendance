import mysql from 'mysql';
import createTables from './config';
import Promise from 'bluebird';
const database = 'automatedattendance';

var connection = mysql.createConnection({
  user: process.env.MYSQL_ADMIN,
  password: process.env.MYSQL_PASSWORD
});

var db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync().then(function() {
  console.log('Connected to ' + database + 'database as ID ' + db.threadId);
  return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
}).then(function() {
  return db.queryAsync('USE ' + database);
}).then(function() {
  return createTables(db);
});

module.exports = db;