export default class SearchQueries {

  firstLastGithubNames() {
    return 'SELECT first_name, last_name, user_name FROM users';
  }

  allUserList() {
    return 'SELECT * from users;';
  }

  getMatchedUsers(matches) {
    let qs = '';
    matches.forEach(function (user, index) {
      if (index === matches.length - 1) {
        qs += `user_name='${user.transaction.subject_id}';`;
      } else {
        qs += `user_name='${user.transaction.subject_id}' or `;
      }
    });
    return `SELECT email FROM users where ${qs}`;
  }

  getPendingUsers() {
    return `SELECT * FROM attendance_record WHERE status='Pending'`;
  }

  getLateUsers() {
    return `SELECT users.email, users.first_name FROM users 
    RIGHT JOIN attendance_record ON users.users_id=attendance_record.user_id;`;
  }
}