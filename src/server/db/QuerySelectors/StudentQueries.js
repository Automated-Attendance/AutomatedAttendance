export default class StudentQueries {

  removeFromClass({ studentUserName, className }) {
    return `DELETE FROM class_user WHERE user_id = (SELECT users_id 
    FROM users WHERE user_name='${studentUserName}') 
    AND class_id = (SELECT classes_id 
    FROM classes WHERE class_name ='${className}')`;
  }

}