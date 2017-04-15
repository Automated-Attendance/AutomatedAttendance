import UserQueries from '../QuerySelectors/AuthQueries';
import Promise from 'bluebird';
import db from '../index';

Promise.promisifyAll(db);


export default class UserModel extends UserQueries {

  constructor() {
    super();
  }

  async storeIfNew({ email, name, nickname }) {
    let [ firstName, lastName ] = name.split(' ');
    let userCheckQuery = super.selectExistingUser(email);
    let [userInfo] = await db.queryAsync(userCheckQuery);
    if (!userInfo.length) {
      let insertUserQuery = super.insertNewUser(firstName, lastName, nickname, email);
      await db.queryAsync(insertUserQuery);
    }
  }

  async updateIfAdmin({ role, email }) {
    let updateQuery = super.updateToAdmin(email);
    if (role === 'admin') {
      await db.queryAsync(updateQuery);
      return 'admin';
    }
    return undefined;
  }

  async getUserData(email) {
    let userQuery = super.selectExistingUser(email);
    return await db.queryAsync(userQuery);
  }

};