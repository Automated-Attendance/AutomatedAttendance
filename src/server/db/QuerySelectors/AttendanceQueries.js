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

  userRecordDate(id) {
    return `SELECT date FROM attendance_record WHERE user_id='${id}'`;
  }

  insertRecord(id) {
    return `INSERT INTO attendance_record(status, user_id) VALUES ('Pending', '${id}');`;
  }

}