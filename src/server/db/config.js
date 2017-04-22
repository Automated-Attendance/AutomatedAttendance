import Promise from 'bluebird';

module.exports = async function(db) {
  /* istanbul ignore next */
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
};
