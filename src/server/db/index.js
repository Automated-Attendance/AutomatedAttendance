import mysql from 'mysql';
import createTables from './config';
import Promise from 'bluebird';
let database;
let connection;

/* istanbul ignore next */
if (process.env.HEROKU_ENV === 'production') {
  //heroku PRODUCTION
  database = process.env.MYSQL_DB_NAME;
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ADMIN,
    password: process.env.MYSQL_PASSWORD,
    database: database
  });
} else {
  // travis CI && local testing
  database = 'automatedattendance';
  connection = mysql.createConnection({
    user: 'root',
    password: ''
  });
}

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync().then(function() {
  // keep the connection alive so server doesnt crash 
  setInterval(() => db.queryAsync('SELECT 1'), 5000);
})
.then(function() {
  console.log('Connected to ' + database + 'database as ID ' + db.threadId);
  return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
})
.then(function() {
  return db.queryAsync('USE ' + database);
})
.then(function() {
  return createTables(db);
})
.catch(function(err) {
  console.log(err.message);
});

module.exports = db;
