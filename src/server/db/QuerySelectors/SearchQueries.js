export default class SearchQueries {

  allAttendance() {
    return `SELECT * FROM attendance_record
      JOIN users ON attendance_record.user_id=users.users_id
      JOIN class_user ON users.users_id=class_user.user_id
      JOIN classes ON classes.classes_id=class_user.class_id;`;
  }

  studentAttendance(email) {
    return `SELECT * FROM attendance_record
      JOIN users ON attendance_record.user_id=users.users_id
      JOIN class_user ON users.users_id=class_user.user_id
      JOIN classes ON classes.classes_id=class_user.class_id
      WHERE users.email='${email}';`;
  }

  firstLastGithubNames() {
    return 'SELECT first_name, last_name, user_name FROM users';
  }

  allUserList() {
    return 'SELECT * from users;';
  }

  usersByClass(classes) {
    let qs = '';
    classes.forEach((classes, index) => {
      if (index === classes.length - 1) {
        qs += `classes.class_name='${classes}'`;
      } else {
        qs += `classes.class_name='${classes}' or `;
      }
    });
    return `SELECT * FROM users JOIN class_user on users.users_id=class_user.user_id
    JOIN classes on class_user.class_id=classes.classes_id WHERE ${qs};`;
  }

  getMatchedUsers(matches) {
    let qs = '';
    matches.forEach(function (user, index) {
      if (index === matches.length - 1) {
        qs += `user_name='${user.transaction.subject_id}';`;
      } else {
        qs += `user_name='${user.transaction.subject_id}' or `;
      }
    });
    return `SELECT email FROM users where ${qs}`;
  }

  getPendingUsers() {
    return `SELECT * FROM attendance_record WHERE status='Pending'`;
  }

  getLateUsers() {
    return `SELECT users.email, users.first_name FROM users 
    RIGHT JOIN attendance_record ON users.users_id=attendance_record.user_id;`;
  }
}