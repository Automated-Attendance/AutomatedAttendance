import db from './index';

exports.addStudent =  async (req, res) => {
  try {
    const { studentName, studentEmail, selectedClass, link } = req.body

    let addUser = `INSERT INTO users (user_name, email, photo) 
    VALUES ('${studentName}', '${studentEmail}', '${link}')`;

    let addUserClass = `INSERT INTO class_user (class_id, user_id) 
    SELECT classes.classes_id, users.users_id FROM classes, users 
    WHERE users.email='${studentEmail}' 
    AND classes.class_name='${selectedClass}'`;

    await db.queryAsync(addUser);
    await db.queryAsync(addUserClass);
    res.status(201).send('Upload Sucessful!');

  } catch (err) {
    res.status(500).send(err);
  }
};

// old with callbacks for reference
// db.queryAsync(addUser, (error, result) => {
//   if (error) {
//     res.status(500).send(error);
//   } else {
//     db.queryAsync(addUserClass, (error, result) => {
//       if (error) {
//         res.status(500).send(error);
//       } else {
//         res.status(201).send('Upload Sucessful!');
//       }
//     });
//   }
// });
