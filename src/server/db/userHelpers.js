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
      const { email } = req.user._json;
      const [user] = await Auth.getUserData(email);
      res.send(user);
    } else {
      res.send('not logged in');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
