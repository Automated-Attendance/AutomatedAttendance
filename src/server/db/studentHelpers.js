import db from './index';

exports.addStudent = (req, res) => {
  let addUser = `INSERT INTO users (user_name, email, photo) VALUES ('${req.body.studentName}','${req.body.studentEmail}','${req.body.link}')`;
  let addUserClass = `INSERT INTO class_user (class_id, user_id) SELECT classes.classes_id, users.users_id FROM classes, users WHERE users.email='${req.body.studentEmail}' AND classes.class_name='${req.body.selectedClass}'`;
  db.queryAsync(addUser, (error, result) => {
    if (error) {
      res.status(500).send(error)
    } else {
      db.queryAsync(addUserClass, (error, result) => {
        if (error) {
          res.status(500).send(error)
        } else {
          res.status(201).send('Upload Sucessful!');
        }
      });
    }
  });
}
