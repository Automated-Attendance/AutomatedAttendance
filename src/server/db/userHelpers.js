import Promise from 'bluebird';
import db from './index';
import AuthModel from './QueryModels/AuthModel';
const Auth = new AuthModel();

Promise.promisifyAll(db);

exports.storeAndLogin = async (req, res) => {
  try {
    let user = req.user._json;
    await Auth.storeIfNew(user);
    const admin = await Auth.updateIfAdmin(user);
    admin ? res.redirect('/Admin') : res.redirect('/Student');
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
