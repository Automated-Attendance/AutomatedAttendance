import Promise from 'bluebird';
import db from './index';

Promise.promisifyAll(db);

exports.storeIfNew = async (req, res, next) => {
  try {
    let { email, name, nickname } = req.user._json;
    const [ firstName, lastName ] = name.split(' ');
    const results = await db.queryAsync(`SELECT email FROM users WHERE email='${email}'`);
    if (!results[0].length) {
      let newUser = { 
        user_name: nickname, 
        email: email,
        first_name: firstName,
        last_name: lastName
      };
      await db.queryAsync('INSERT INTO users SET ?', newUser);
    }
    next(); 
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.retrieveData = async (req, res) => {
  try {
    if (req.user) {
      const userEmail = req.user._json.email;
      const selectUser = `SELECT * FROM users WHERE email='${userEmail}'`;
      const response = await db.queryAsync(selectUser);
      res.send(response[0]);
    } else {
      res.send('not logged in');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateIfAdmin = async (req, res, next) => {
  try {
    const adminPrivs = req.user._json.role === 'admin';
    const userEmail = req.user._json.email;
    if (adminPrivs) {
      const updateToAdmin = `UPDATE users SET type='admin' WHERE email='${userEmail}'`;
      await db.queryAsync(updateToAdmin);
    }
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};
