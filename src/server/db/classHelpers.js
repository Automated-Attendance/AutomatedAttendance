import db from './index';

exports.getClass = (req, res) => {
  let queryClass = 'SELECT class_name FROM classes';
  db.queryAsync(queryClass, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
}