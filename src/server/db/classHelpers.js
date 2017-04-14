import db from './index';
import ClassModel from './QueryModels/ClassModel';
const Class = new ClassModel();

exports.getClass = async (req, res) => {
  try {
    const classes = await Class.getClassList();
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
