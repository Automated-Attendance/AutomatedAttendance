import db from './index';

exports.getClass = async (req, res) => {
  try {
    let queryClass = 'SELECT class_name FROM classes';
    const classes = await db.queryAsync(queryClass);
    res.status(200).send(classes);
  }
  catch (err) {
    res.status(500).send(err);
  } 
}

exports.addClass = async (req, res, next) => {
  try {
    let className = req.body.className;
    let addQuery = `INSERT INTO classes (class_name) VALUES ('${className}')`;
    await db.queryAsync(addQuery);
    res.status(201).send('Class Added Successfully!');
  }
  catch (err) {
    res.status(500).send(err);
  }
}

exports.getEnrollment = async (req, res) => {
  try {
    let enrollmentQuery = `SELECT * FROM classes
      RIGHT JOIN class_user ON classes.classes_id=class_user.class_id
      LEFT JOIN users ON class_user.user_id=users.users_id`;
    const enrollment = await db.queryAsync(enrollmentQuery)
    res.status(201).send(enrollment);
  }
  catch (err) {
    res.status(500).send(err);
  }
}
