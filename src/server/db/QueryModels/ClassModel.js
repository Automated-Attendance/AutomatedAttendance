import ClassQueries from '../QuerySelectors/ClassQueries';
import Promise from 'bluebird';
import db from '../index.js';

Promise.promisifyAll(db);

export default class ClassModel extends ClassQueries {

  constructor() {
    super();
  }

  async getClassList() {
    const queryString = super.allClasses();
    return await db.queryAsync(queryString);
  }

  async addClass(className) {
    const queryString = super.addClass(className);
    return await db.queryAsync(queryString);
  }

  async removeClass(className) {
    const classUserString = super.removeFromClassUser(className);
    const classesString = super.removeFromClasses(className);
    await db.queryAsync(classUserString);
    return await db.queryAsync(classesString);
  }

  async getEnrollment() {
    const queryString = super.getEnrollment();
    return await db.queryAsync(queryString);
  }

  async checkIfClassExists(className) {
    const queryString = super.checkIfClassExists(className);
    return await db.queryAsync(queryString);
  }

}