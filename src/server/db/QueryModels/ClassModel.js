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

  async addClass() {
    const queryString = super.addClass();
    return await db.queryAsync(queryString);
  }

}