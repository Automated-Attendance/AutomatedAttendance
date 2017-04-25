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

const initConnection = async () => {
  try {
    const db = Promise.promisifyAll(connection, { multiArgs: true });
    await db.connectAsync();
    // await db.queryAsync('DROP DATABASE IF EXISTS ' + database);
    console.log('Connected to ' + database + 'database as ID ' + db.threadId);
    await db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
    await db.queryAsync('USE ' + database);
    await createTables(db);
    module.exports = db;
  } catch (err) {
    console.log(err.message, 'there was an error connecting to the database');
  }
};

initConnection();
