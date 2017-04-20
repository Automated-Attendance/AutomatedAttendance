import Promise from 'bluebird';

module.exports = async function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS users (
    users_id int NOT NULL AUTO_INCREMENT,
    user_name varchar(50) NOT NULL,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50) NOT NULL UNIQUE,
    photo varchar(200),
    type varchar(50) DEFAULT 'student',
    PRIMARY KEY (users_id)
  );`);
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS classes (
      classes_id int NOT NULL AUTO_INCREMENT,
      class_name varchar(50) NOT NULL,
      PRIMARY KEY (classes_id)
    );`);  
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS attendance_record (
      attendance_record_id int NOT NULL AUTO_INCREMENT,
      checkin_time varchar(50),
      cutoff_time varchar(50) NOT NULL,
      status varchar(50),
      user_id int NOT NULL,
      PRIMARY KEY (attendance_record_id)
    );`);
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS class_user (
      id int NOT NULL AUTO_INCREMENT,
      class_id int NOT NULL,
      user_id int NOT NULL,
      PRIMARY KEY (id)
    );`);
  await db.queryAsync(`ALTER TABLE class_user ADD FOREIGN KEY (class_id)
      REFERENCES classes(classes_id);`);
  await db.queryAsync(`ALTER TABLE class_user ADD FOREIGN KEY (user_id)
      REFERENCES users(users_id);`);
  await db.queryAsync(`ALTER TABLE attendance_record ADD FOREIGN KEY (user_id)
      REFERENCES users(users_id);`);
  await db.queryAsync(`set time_zone='-07:00'`);
  // await db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('hanzh', 'Han', 'Zhao', 'hanshengzhao1993@gmail.com');`);
  // await db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('andrewaaalonis', 'Andrew', 'Alonis', 'myemailisthirtyninedigitslong@gmail.com');`);
  // await db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('Duy12312313', 'Duy', 'Nguyen', 'duyng92@gmail.com');`);
  // await db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) VALUES ('Jukejc', 'Jason', 'Chambers', 'jciphone333@gmail.com');`);
  // await db.queryAsync(`INSERT INTO classes (class_name) VALUES ('HRSF72');`);
  // await db.queryAsync(`INSERT INTO classes (class_name) VALUES ('HRSF76');`);
  // await db.queryAsync(`INSERT INTO class_user (class_id, user_id)
  //     VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),
  //     (SELECT users_id FROM users WHERE email='hanshengzhao1993@gmail.com'));`);
  // await db.queryAsync(`INSERT INTO class_user (class_id, user_id)
  //     VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),
  //     (SELECT users_id FROM users WHERE email='myemailisthirtyninedigitslong@gmail.com'));`);
  // await db.queryAsync(`INSERT INTO class_user (class_id, user_id)
  //     VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF72'),
  //     (SELECT users_id FROM users WHERE email='jciphone333@gmail.com'));`);
  // await db.queryAsync(`INSERT INTO class_user (class_id, user_id)
  //     VALUES ((SELECT classes_id FROM classes WHERE class_name='HRSF76'),
  //     (SELECT users_id FROM users WHERE user_name='Duy12312313'));`);
};
