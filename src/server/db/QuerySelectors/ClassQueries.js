export default class ClassQueries {

  allClasses() {
    return 'SELECT class_name FROM classes';
  }

  addClass(className) {
    return `INSERT INTO classes (class_name) VALUES ('${className}')`;
  }

  removeFromClassUser(className) {
    return `DELETE FROM class_user WHERE class_id = (SELECT classes_id FROM classes WHERE class_name = '${className}')`;
  }

  removeFromClasses(className) {
    return `DELETE FROM classes WHERE class_name = '${className}'`;
  }
  
  getEnrollment() {
    return `SELECT * FROM classes
      RIGHT JOIN class_user ON classes.classes_id=class_user.class_id
      LEFT JOIN users ON class_user.user_id=users.users_id`;
  }

  checkIfClassExists(className) {
    return `SELECT * FROM classes WHERE class_name = '${className}'`;
  }

}