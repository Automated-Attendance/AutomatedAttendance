import AttendanceQueries from '../QuerySelectors/AttendanceQueries';
import Promise from 'bluebird';
import db from '../index.js';
import { sendAbsentEmails } from '../../mailgun/mailgunHelpers';

Promise.promisifyAll(db);

export default class AttendanceModel extends AttendanceQueries {

  constructor() {
    super();
  }

  async getStudentRecord(email) {
    const queryString = super.studentAttendance(email);
    return await db.queryAsync(queryString);
  }

  async getAllRecords() {
    const queryString = super.allAttendance();
    return await db.queryAsync(queryString);
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
        if (existingDay !== currentDay) {
          db.queryAsync(insertQuery);  
        }
      } else {
        db.queryAsync(insertQuery);
      }
    });
  }

  async emailLateStudents() {
    const getLateUsersQuery = super.getPendingUsers();
    const getAllLateEmailsQuery = super.getAllLateUserEmails();
    const [users] = await db.queryAsync(getLateUsersQuery);
    users.forEach(async (user) => {
      let lateQuery = super.pendingToAbsent(user.user_id);
      await db.queryAsync(lateQuery);
    });
    const [emails] = await db.queryAsync(getAllLateEmailsQuery);
    await sendAbsentEmails(emails);
  }
}


