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
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, email) VALUES ("han", "hanz@gmail.com");`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, email) VALUES ("andrew", "andrew.alonis@gmail.com");`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, email) VALUES ("duy", "myemailisthirtyninedigitslong@gmail.com");`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, email) VALUES ("jason", "han.bigge@gmail.com");`);
  })
  // .then(function() {
  //   return db.queryAsync(`INSERT INTO users (user_name, email) VALUES ("Hansheng", "jciphone333@gmail.com");`);
  // })
  .then(function() {
    return db.queryAsync(`INSERT INTO classes (class_name) VALUES ('HRSF72');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO classes (class_name) VALUES ('HRSF76');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)\
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),\
      (SELECT users_id FROM users WHERE user_name='han'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)\
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),\
      (SELECT users_id FROM users WHERE user_name='andrew'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)\
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),\
      (SELECT users_id FROM users WHERE user_name='jason'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)\
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF76'),\
      (SELECT users_id FROM users WHERE user_name='duy'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)\
      VALUES ('ontime', (SELECT users_id FROM users WHERE user_name='han'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)\
      VALUES ('ontime', (SELECT users_id FROM users WHERE user_name='andrew'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)\
      VALUES ('late', (SELECT users_id FROM users WHERE user_name='jason'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)\
      VALUES ('absent', (SELECT users_id FROM users WHERE user_name='duy'));`);
  })
  .error(function(err) {
    console.log(err);
  });
};
