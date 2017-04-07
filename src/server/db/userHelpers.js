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


    // id int NOT NULL AUTO_INCREMENT,
    // name varchar(50),
    // email varchar(50),
    // photo varchar(200),
    // type varchar(50) DEFAULT 'student',
    // PRIMARY KEY (id)