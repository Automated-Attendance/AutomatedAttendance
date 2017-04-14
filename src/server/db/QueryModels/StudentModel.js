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
}