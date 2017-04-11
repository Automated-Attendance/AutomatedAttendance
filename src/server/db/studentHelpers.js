import db from './index';

exports.addStudent =  async (req, res, next) => {
  try {
    const { studentName, studentEmail, selectedClass, imageLink } = req.body

    let addUser = `INSERT INTO users (user_name, email, photo) 
    VALUES ('${studentName}', '${studentEmail}', '${imageLink}')`;

    let addUserClass = `INSERT INTO class_user (class_id, user_id) 
    SELECT classes.classes_id, users.users_id FROM classes, users 
    WHERE users.email='${studentEmail}' 
    AND classes.class_name='${selectedClass}'`;

    await db.queryAsync(addUser);
    await db.queryAsync(addUserClass);
    next();

  } catch (err) {
    res.status(500).send(err);
  }
};