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
    const enrollment = await Class.getEnrollment();
    res.status(200).send(enrollment);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
};