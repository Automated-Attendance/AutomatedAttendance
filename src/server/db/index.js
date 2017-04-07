import mysql from 'mysql';
import createTables from './config';
import Promise from 'bluebird';
const database = process.env.MYSQL_DB_NAME;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ADMIN,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME
});

const db = Promise.promisifyAll(connection, { multiArgs: true });



db.connectAsync().then(function() {
  return db.queryAsync('DROP DATABASE IF EXISTS ' + database);
})
.then(function() {
  console.log('Connected to ' + database + 'database as ID ' + db.threadId);
  return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
}).then(function() {
  return db.queryAsync('USE ' + database);
}).then(function() {
  return createTables(db);
});

module.exports = db;