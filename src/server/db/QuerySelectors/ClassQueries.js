export default class ClassQueries {

  allClasses() {
    return 'SELECT class_name FROM classes';
  }

  addClass(className) {
    return `INSERT INTO classes (class_name) VALUES ('${className}')`;
  }

  removeFromClassUser(className) {
    return `DELETE FROM class_user WHERE class_id= (SELECT classes_id FROM classes WHERE class_name = '${className}')`;
  }

  removeFromClasses(className) {
    return `DELETE FROM classes WHERE class_name = '${className}'`;
  }
  
}