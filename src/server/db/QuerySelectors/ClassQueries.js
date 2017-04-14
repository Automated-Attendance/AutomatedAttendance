export default class ClassQueries {

  allClasses() {
    return 'SELECT class_name FROM classes';
  }

  addClass(classname) {
    return `INSERT INTO classes (class_name) VALUES ('${classname}')`;
  }

}