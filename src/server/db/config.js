import Promise from 'bluebird';

module.exports = function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table
  return db.queryAsync(`CREATE TABLE IF NOT EXISTS users (
    users_id int NOT NULL AUTO_INCREMENT,
    user_name varchar(50) NOT NULL,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50) NOT NULL UNIQUE,
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
    return db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('hanzh', 'Han', 'Zhao', 'hanshengzhao1993@gmail.com');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('andrewaaalonis', 'Andrew', 'Alonis', 'andrew@gmail.com');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('Duy12312313', 'Duy', 'Nguyen', 'duyng92@gmail.com');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('jukejc', 'Jason', 'Chambers', 'jciphone333@gmail.com');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO classes (class_name) VALUES ('HRSF72');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO classes (class_name) VALUES ('HRSF76');`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),
      (SELECT users_id FROM users WHERE email='hanshengzhao1993@gmail.com'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),
      (SELECT users_id FROM users WHERE email='andrew@gmail.com'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),
      (SELECT users_id FROM users WHERE email='jciphone333@gmail.com'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO class_user (class_id, user_id)
      VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF76'),
      (SELECT users_id FROM users WHERE user_name='Duy12312313'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)
      VALUES ('On time', (SELECT users_id FROM users WHERE email='hanshengzhao1993@gmail.com'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)
      VALUES ('On time', (SELECT users_id FROM users WHERE email='andrew@gmail.com'));`);
  })
  .then(function() {
    return db.queryAsync(`INSERT INTO attendance_record(status, user_id)
      VALUES ('absent', (SELECT users_id FROM users WHERE user_name='Duy12312313'));`);
  })
  .error(function(err) {
    console.log(err);
  });
};
