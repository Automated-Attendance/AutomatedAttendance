import ClassModel from '../QueryModels/ClassModel';
import { removeGallery } from '../../kairosFR/kairosHelpers';

const Class = new ClassModel();

exports.getClass = async (req, res) => {
  try {
    const classes = await Class.getClassList();
    res.status(200).send(classes);
  }
  catch (err) {
    res.status(500).send(err.message);
  } 
};

exports.addClass = async (req, res) => {
  try {
    const { className } = req.body;
    await Class.addClass(className);
    res.sendStatus(201);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
};

exports.removeClass = async (req, res) => {
  try {
    const { className } = req.body;
    await Class.removeClass(className);
    await removeGallery(className);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    let enrollmentQuery = `SELECT * FROM classes
      RIGHT JOIN class_user ON classes.classes_id=class_user.class_id
      LEFT JOIN users ON class_user.user_id=users.users_id`;
    const enrollment = await db.queryAsync(enrollmentQuery)
    console.log('enrollment', enrollment);
    res.status(201).send(enrollment);
  }
  catch (err) {
    res.status(500).send(err);
  }
};