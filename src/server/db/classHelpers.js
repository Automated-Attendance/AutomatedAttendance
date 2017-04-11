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