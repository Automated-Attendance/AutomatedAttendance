import db from './index';
import ClassModel from './QueryModels/ClassModel';

const Class = new ClassModel();

exports.getClass = async (req, res) => {
  try {
    const classes = await Class.getClassList();
    res.status(200).send(classes);
  }
  catch (err) {
    res.status(500).send(err.message);
  } 
}

exports.addClass = async (req, res, next) => {
  try {
    const { className } = req.body;
    await Class.addClass(className);
    res.sendStatus(201);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
}
