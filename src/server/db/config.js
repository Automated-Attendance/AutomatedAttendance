import Promise from 'bluebird';

module.exports = function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table
  return db.queryAsync(`CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50),
    email varchar(50),
    photo varchar(200),
    type varchar(50) DEFAULT 'student',
    PRIMARY KEY (id)
  );`)
  .then(function() {
    return db.queryAsync(`CREATE TABLE IF NOT EXISTS classes (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(50),
      PRIMARY KEY (id)
    );`);
  })
  .then(function() {
    return db.queryAsync(`CREATE TABLE IF NOT EXISTS AttendanceRecord (
      id int NOT NULL AUTO_INCREMENT,
      date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status varchar(50),
      user_id int NOT NULL,
      PRIMARY KEY (id)
    );`);
  })
  .then(function() {
    return db.queryAsync(`CREATE TABLE IF NOT EXISTS class_user (
      id int NOT NULL AUTO_INCREMENT,
      class_id int NOT NULL,
      user_id int NOT NULL,
      PRIMARY KEY (id)
    );`);
  })
  .then(function() {
    return db.queryAsync(`ALTER TABLE class_user ADD FOREIGN KEY (class_id)
      REFERENCES classes(id);`);
  })
  .then(function() {
    return db.queryAsync(`ALTER TABLE class_user ADD FOREIGN KEY (user_id)
      REFERENCES users(id);`);
  })
  .then(function() {
    return db.queryAsync(`ALTER TABLE AttendanceRecord ADD FOREIGN KEY (user_id)
      REFERENCES users(id);`);
  })
  .error(function(err) {
    console.log(err);
  });
};