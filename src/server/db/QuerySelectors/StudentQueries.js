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
    return `SELECT email, users_id FROM users where ${qs}`;
  }

  checkInQuery(matches) {
    let qs = '';
    matches.forEach((user, index) => {
      console.log(user);
      if (index === matches.length - 1) {
        qs += `user_id='${user.users_id}'`;
      } else {
        qs += `user_id='${user.users_id}' or `;
      }
    });
    return `UPDATE attendance_record SET status='On time' WHERE ${qs}`;
  }

}