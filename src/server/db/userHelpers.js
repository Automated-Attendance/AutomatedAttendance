import Promise from 'bluebird';
import db from './index';

Promise.promisifyAll(db);

exports.storeIfNew = (req, res, next) => {
  let profile = req.user;
  db.queryAsync(`SELECT email FROM users WHERE email='${profile.emails[0].value}'`)
  .then((results) => {
    if (!results[0].length) {
      let newUser = { name: profile.nickname, email: profile.emails[0].value };
      db.queryAsync('INSERT INTO users SET ?', newUser)
      .then(() => next())
      .catch((err) => res.status(500).send(err));
    } else {
      next();
    }
  })
  .catch((err) => res.status(500).send(err));
};

exports.retrieveData = (req, res) => {
  if (req.user) {
    const userEmail = req.user.emails[0].value;
    const qs = `SELECT * FROM users WHERE email='${userEmail}'`;
    db.queryAsync(qs)
    .then((response) => res.send(response[0]));
  } else {
    res.send('not logged in');
  }
};

exports.updateIfAdmin = (req, res, next) => {
  const adminPrivs = req.user._json.role === 'admin';
  const userEmail = req.user.emails[0].value;
  if (adminPrivs) {
    const qs = `UPDATE users SET type='admin' WHERE email='${userEmail}'`;
    db.queryAsync(qs)
    .then((response) => next())
    .catch((err) => res.status(500).send(err));
  } else {
    next();
  }
};