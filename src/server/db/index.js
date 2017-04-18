import mysql from 'mysql';
import createTables from './config';
import Promise from 'bluebird';
let database;
let connection;

if (process.env.LOCAL_ENV && process.env.CLOUD_TEST_DB) {
  database = process.env.CLOUD_TEST_DB_NAME;
  connection = mysql.createConnection({
    host: process.env.CLOUD_TEST_DB_HOST,
    user: process.env.CLOUD_TEST_DB_ADMIN,
    password: process.env.CLOUD_TEST_DB_PASSWORD,
  });
} else if (process.env.LOCAL_ENV) {
  database = process.env.MYSQL_DB_NAME_LOCAL;
  connection = mysql.createConnection({
    user: process.env.MYSQL_ADMIN_LOCAL,
    password: process.env.MYSQL_PASSWORD_LOCAL,
  });
} else {
  database = process.env.MYSQL_DB_NAME;
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ADMIN,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
  });
}

const db = Promise.promisifyAll(connection, { multiArgs: true });



db.connectAsync().then(function() {
  // keep the connection alive so server doesnt crash 
  // setInterval(() => db.queryAsync('SELECT 1'), 5000);
  // return db.queryAsync('DROP DATABASE IF EXISTS ' + database);
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
});

module.exports = db;