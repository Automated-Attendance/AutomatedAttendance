import ClassModel from '../QueryModels/ClassModel';
import { removeGallery } from '../../kairosFR/kairosHelpers';

const Class = new ClassModel();

exports.getClass = async (req, res) => {
  try {
    const classes = await Class.getClassList();
    res.status(200).send(classes);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  } 
};

exports.addClass = async (req, res) => {
  try {
    const { className } = req.body;
    const [exists] = await Class.checkIfClassExists(className);
    if (!exists.length) {
      await Class.addClass(className);
      res.sendStatus(201);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
};

exports.removeClass = async (req, res) => {
  try {
    const classNames = req.body.className.split(',');
    for (let i = 0; i < classNames.length; i++) {
      const { className } = { className: classNames[i] };
      await Class.removeClass(className);
      await removeGallery(className);
    }
    res.sendStatus(202);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Class.getEnrollment();
    res.status(200).send(enrollment);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
};
