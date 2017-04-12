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

    let updateUser = `UPDATE users SET photo='${imageLink}' 
    WHERE email='${studentEmail}';`

    let selectUser = `SELECT email FROM users WHERE email='${studentEmail}'`;

    const results = await db.queryAsync(selectUser);
    
    if (results[0].length) {
      await db.queryAsync(updateUser);
    } else {
      await db.queryAsync(addUser);
    }

    await db.queryAsync(addUserClass);
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};