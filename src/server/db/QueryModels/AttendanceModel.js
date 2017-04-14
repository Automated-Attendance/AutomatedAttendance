import AttendanceQueries from '../QuerySelectors/AttendanceQueries';
import Promise from 'bluebird';
import db from '../index.js';

Promise.promisifyAll(db);

export default class AttendanceModel extends AttendanceQueries {

  constructor() {
    super();
  }

  async storeRecords(classes) {
    const userListQuery = super.usersByClass(classes);
    const users = await db.queryAsync(userListQuery);
    users[0].forEach(async (user) => {
      let insertQuery = super.insertRecord(user.users_id);
      let userDateQuery = super.userRecordDate(user.users_id);
      let userDate = await db.queryAsync(userDateQuery);
      if (userDate[0].length) {
        let existingDay = new Date(userDate[0][0].date).getDay();
        let currentDay = new Date().getDay();
        console.log(existingDay, currentDay)
        if (existingDay !== currentDay) {
          db.queryAsync(insertQuery);  
        }
      } else {
        db.queryAsync(insertQuery);
      }
    });
  }

}