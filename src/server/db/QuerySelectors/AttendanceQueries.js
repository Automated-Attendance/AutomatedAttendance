export default class AttendanceQueries {

  usersByClass(classes) {
    let qs = '';
    classes.forEach((className, index) => {
      if (index === classes.length - 1) {
        qs += `classes.class_name='${className}'`;
      } else {
        qs += `classes.class_name='${className}' or `;
      }
    });
    return `SELECT * FROM users JOIN class_user ON users.users_id=class_user.user_id
    JOIN classes ON class_user.class_id=classes.classes_id WHERE ${qs};`;
  }

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

  userRecordDate(id) {
    return `SELECT checkin_time FROM attendance_record WHERE user_id='${id}'`;
  }

  insertRecord(id, time) {
    return `INSERT INTO attendance_record(status, user_id, cutoff_time) VALUES ('Pending', '${id}', '${time}');`;
  }

  getPendingUsers() {
    return `SELECT * FROM attendance_record WHERE status='Pending'`;
  }

  pendingToAbsent(id) {
    return `UPDATE attendance_record SET status='Absent' WHERE user_id='${id}'`;
  }

  getAllLateUserEmails() {
    return `select users.email, users.first_name from users 
    RIGHT JOIN attendance_record ON users.users_id=attendance_record.user_id;`;
  }

  deleteRecordByDay(date) {
    return `DELETE FROM attendance_record where date BETWEEN '${date} 00:00:00' and '${date} 23:59:59'; `
  }

}