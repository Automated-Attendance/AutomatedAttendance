import db from './index';
import StudentModel from './QueryModels/StudentModel';
import { galleryRemoveUser } from '../kairosFR/kairosHelpers';
import { upload } from '../cloudinary/cloudHelpers';
import { storeInGallery } from '../kairosFR/kairosHelpers';

const Student = new StudentModel();

exports.addToClass =  async (req, res, next) => {
  try {
    const { studentUserName, selectedClass, imageLink } = req.body

    const addUserClass = `INSERT INTO class_user (class_id, user_id) 
    SELECT classes.classes_id, users.users_id FROM classes, users 
    WHERE users.user_name='${studentUserName}' 
    AND classes.class_name='${selectedClass}'`;

    const updateUser = `UPDATE users SET photo='${imageLink}' 
    WHERE user_name='${studentUserName}';`

    await db.queryAsync(updateUser);
    await db.queryAsync(addUserClass);
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addToClass = (req, res) => {
  try {
    let { studentPhoto, studentUserName, selectedClass } = req.body;
    const { url } = await upload(req.body);
    await Student.updateUser(url, studentUserName);
    await Student.addToClass(studentUserName, selectedClass);
    let result = await storeInGallery(studentUserName, selectedClass, url);
    res.sendStatus(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

exports.removeFromClass = async (req, res) => {
  try {
    await Student.removeFromClass(req.body);
    await galleryRemoveUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};