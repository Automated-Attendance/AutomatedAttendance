import cloudinary from 'cloudinary';
import db from './../db/index.js'

exports.post = (req, res) => {
  const screenshot = req.body.img;
  const options = {
    format: 'png',
    public_id: 'temporary'
  };
  cloudinary.v2.uploader.upload(screenshot, options, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
};

exports.upload = (req,res) => {
  const { studentName, studentEmail, studentPhoto, selectedClass } = req.body;
  const options = {
    format: 'png'
  }
  cloudinary.v2.uploader.upload(studentPhoto, (err,result) => {
    if (err) { 
      res.status(500).send(err);
    } else {
      let link = result.url;
      let addUser = `INSERT INTO users (user_name,email,photo) VALUES ('${studentName}','${studentEmail}','${link}')`;
      let addUserClass = `INSERT INTO class_user (class_id, user_id) SELECT classes.classes_id, users.users_id FROM classes, users WHERE users.email='${studentEmail}' AND classes.class_name='${selectedClass}'`;
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
          })
        }
      })
    }
  })
}