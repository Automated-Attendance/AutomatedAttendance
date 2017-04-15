import StudentQueries from '../QuerySelectors/StudentQueries';
import Promise from 'bluebird';
import db from '../index.js';

Promise.promisifyAll(db);

export default class StudentModel extends StudentQueries {

  constructor() {
    super();
  }

  async removeFromClass(studentInfo) {
    const queryString = super.removeFromClass(studentInfo);
    return await db.queryAsync(queryString);
  }

  async updateUser(image, userName) {
    let updateQuery = super.updateUser(image, userName);
    return await db.queryAsync(updateQuery);
  }

  async addToClass(userName, className) {
    let addQuery = super.addToClass(userName, className);
    return await db.queryAsync(addQuery);
  }

  async getMatchedUsers(matches) {
    let matchedUsersQuery = super.getMatchedUsers(matches);
    return await db.queryAsync(matchedUsersQuery);
  }

  async checkInOnTime(matches) {
    let checkInQuery = super.checkInQuery(matches);
    return await db.queryAsync(checkInQuery);
  }

  async checkIfStudentIsEnrolled(userName, className) {
    const queryString = super.checkIfStudentIsEnrolled(userName, className);
    return await db.queryAsync(queryString);
  }

}