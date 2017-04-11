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