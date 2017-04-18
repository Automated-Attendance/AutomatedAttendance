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

  // todo: find a way to parse dates for a common time, stores duplicate records after 5pm PDT
  async storeRecords(classes, time) {
    const userListQuery = super.usersByClass(classes);
    const [users] = await db.queryAsync(userListQuery);
    users.forEach(async (user) => {
      let insertQuery = super.insertRecord(user.users_id, time);
      let userDateQuery = super.userRecordDate(user.users_id);
      let [userDate] = await db.queryAsync(userDateQuery);
      if (userDate.length) {
        let existingDay = new Date(userDate[0].date).getDay();
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

  async deleteRecordDate({ date }) {
    const deleteQuery = super.deleteRecordByDay(date);
    await db.queryAsync(deleteQuery);
  }
}


