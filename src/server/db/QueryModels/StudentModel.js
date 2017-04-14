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
    let res = await db.queryAsync(queryString);
    console.log(res);
  }
}