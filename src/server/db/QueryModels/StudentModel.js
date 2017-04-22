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
    const updateQuery = super.updateUser(image, userName);
    return await db.queryAsync(updateQuery);
  }

  async addToClass(userName, className) {
    const addQuery = super.addToClass(userName, className);
    return await db.queryAsync(addQuery);
  }

  async getMatchedUsers(matches) {
    const matchedUsersQuery = super.getMatchedUsers(matches);
    return await db.queryAsync(matchedUsersQuery);
  }

  async checkInOnTime(matches, date) {
    const checkInQuery = super.checkInQuery(matches, date);
    return await db.queryAsync(checkInQuery);
  }

  async checkInTardy(matches, date) {
    const checkInTardyQuery = super.checkInTardyQuery(matches, date);
    return await db.queryAsync(checkInTardyQuery);
  }

  async checkIfStudentIsEnrolled(userName, className) {
    const queryString = super.checkIfStudentIsEnrolled(userName, className);
    return await db.queryAsync(queryString);
  }

  async getCutoffTime(date) {
    const queryString = super.getCutoffTime(date);
    return await db.queryAsync(queryString);
  }

  async getStudentsByClass(className) {
    const queryString = super.getStudentsByClass(className);
    return await db.queryAsync(queryString);
  }
  async getAttendanceStatus(user_id, date) {
    const queryString = super.getAttendanceStatus(user_id, date);
    return await db.queryAsync(queryString);
  }
}