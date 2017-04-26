export default class StudentQueries {

  removeFromClass({ studentUserName, className }) {
    return `DELETE FROM class_user WHERE user_id = (SELECT users_id 
    FROM users WHERE user_name='${studentUserName.value}')
    AND class_id = (SELECT classes_id 
    FROM classes WHERE class_name ='${className}')`;
  }

  addToClass(studentUserName, selectedClass) {
    return `INSERT INTO class_user (class_id, user_id) 
    SELECT classes.classes_id, users.users_id FROM classes, users 
    WHERE users.user_name='${studentUserName}' 
    AND classes.class_name='${selectedClass}'`;
  }

  updateUser(imageLink, studentUserName) {
    return `UPDATE users SET photo='${imageLink}' 
    WHERE user_name='${studentUserName}'`;
  }

  getMatchedUsers(matches) {
    let qs = '';
    matches.forEach((user, index) => {
      if (index === matches.length - 1) {
        qs += `user_name='${user.transaction.subject_id}';`;
      } else {
        qs += `user_name='${user.transaction.subject_id}' or `;
      }
    });
    return `SELECT email, users_id, first_name, last_name FROM users where ${qs}`;
  }

  checkInQuery(user_id, date, cutoff_date) {
    return `UPDATE attendance_record SET status='On time', checkin_time='${date}' WHERE user_id = ${user_id} AND cutoff_time LIKE '${cutoff_date}%'`;
  }

  checkInTardyQuery(user_id, date, cutoff_date) {
    return `UPDATE attendance_record SET status='Tardy', checkin_time='${date}' WHERE user_id=${user_id} AND cutoff_time LIKE '${cutoff_date}%'`;
  }

  checkIfStudentIsEnrolled(userName, className) {
    return `SELECT * FROM classes
      JOIN class_user ON classes.classes_id=class_user.class_id AND classes.class_name='${className}'
      JOIN users ON class_user.user_id=users.users_id AND users.user_name='${userName}'`;
  }

  getAttendanceStatus (user_id, date) {
    return `SELECT status FROM attendance_record WHERE user_id=${user_id} AND cutoff_time LIKE '${date}%'`;
  }

  getCutoffTime (date) {
    return `SELECT cutoff_time FROM attendance_record WHERE cutoff_time LIKE '${date}%' LIMIT 1`;
  }

  getStudentInformation(id) {
    return `SELECT * FROM users WHERE users_id='${id}'`;
  }

  getStudentsByClass(className) {
    return `SELECT * FROM users
      JOIN class_user ON users.users_id=class_user.user_id
      JOIN classes ON class_user.class_id=classes.classes_id AND classes.class_name='${className}'`;
  }

  changeUserType(user_name, typeChangedTo) {
    return `UPDATE users SET type='${typeChangedTo}' WHERE user_name='${user_name}'`;
  }
}
