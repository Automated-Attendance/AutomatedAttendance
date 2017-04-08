import Promise from 'bluebird';

module.exports = function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table
  return db.queryAsync(`CREATE TABLE IF NOT EXISTS users (
    users_id int NOT NULL AUTO_INCREMENT,
    user_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    photo varchar(200),
    type varchar(50) DEFAULT 'student',
    PRIMARY KEY (users_id)
  );`)
  .then(function() {
    return db.queryAsync(`CREATE TABLE IF NOT EXISTS classes (
      classes_id int NOT NULL AUTO_INCREMENT,
      class_name varchar(50) NOT NULL,
      PRIMARY KEY (classes_id)
    );`);
  })
  .then(function() {
    return db.queryAsync(`CREATE TABLE IF NOT EXISTS attendance_record (
      attendance_record_id int NOT NULL AUTO_INCREMENT,
      date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status varchar(50),
      user_id int NOT NULL,
      PRIMARY KEY (attendance_record_id)
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
      REFERENCES classes(classes_id);`);
  })
  .then(function() {
    return db.queryAsync(`ALTER TABLE class_user ADD FOREIGN KEY (user_id)
      REFERENCES users(users_id);`);
  })
  .then(function() {
    return db.queryAsync(`ALTER TABLE attendance_record ADD FOREIGN KEY (user_id)
      REFERENCES users(users_id);`);
  })
  .error(function(err) {
    console.log(err);
  });
};
