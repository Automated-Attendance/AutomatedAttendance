import AttendanceQueries from '../QuerySelectors/AttendanceQueries';
import db from '../index';
import { sendAbsentEmails, sendWarningEmails, sendTardyEmails } from '../../mailgun/mailGunHelpers';
import StudentQueries from '../QuerySelectors/StudentQueries'
import StudentModel from '../QueryModels/StudentModel';
import moment from 'moment';

const StudentQuery = new StudentQueries();
const Student = new StudentModel();

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

  async storeRecords(classes, time) {
    const userListQuery = super.usersByClass(classes);
    const [users] = await db.queryAsync(userListQuery);
    const today = moment();
    time = moment(time).format('YYYY-MM-DD HH:mm:ss');
    users.forEach(async (user) => {
      let userId = user.users_id;
      let date = time.slice(0,10);
      let [status] = await Student.getAttendanceStatus(userId, date);
      /* istanbul ignore else */
      if (!status[0]) {
        let insertQuery = super.insertRecord(user.users_id, time);
        await db.queryAsync(insertQuery);
      }
    });
  }

  async emailStudentAboutToBeTardy () {
    const getAllPendingUsersEmails = super.getAllPendingUsersEmails();
    const [users] = await db.queryAsync(getAllPendingUsersEmails);
    await sendTardyEmails(users);
  }

  async emailLateStudents() {
    const getPendingUsersQuery = super.getPendingUsers();
    const [users] = await db.queryAsync(getPendingUsersQuery);

    users.forEach(async (user) => {
      let lateQuery = super.pendingToAbsent(user.user_id);
      await db.queryAsync(lateQuery);
    });

    const getLateStudentsEmails = super.getAllLateUserEmails();
    const [lateUsers] = await db.queryAsync(getLateStudentsEmails);
    await sendAbsentEmails(lateUsers);
  }

  async deleteRecordDate({ date }) {
    const deleteQuery = super.deleteRecordByDay(date);
    await db.queryAsync(deleteQuery);
  }

  async emailWarningStudents() {
    let arrayOfUsers = [];
    const getPendingUsersQuery = super.getPendingUsers();
    const [users] = await db.queryAsync(getPendingUsersQuery);

    await Promise.all(users.map(async (user) => {
      const userQuery = StudentQuery.getStudentInformation(user.user_id)
      const [userInfo] = await db.queryAsync(userQuery);
      arrayOfUsers.push(userInfo);
    }));

    await sendWarningEmails(arrayOfUsers);
  }
  async updateAttendanceStatus({ selectedDate, selectedStudent, selectedStatus }) {
    const selectedName = selectedStudent.value;
    const timeString = selectedDate.slice(0,10);
    const getQuery = super.updateUserStatus(selectedName, timeString, selectedStatus);
    await db.queryAsync(getQuery);
  }
}


