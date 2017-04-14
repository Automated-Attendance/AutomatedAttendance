export default class AuthQueries {

  selectExistingUser(email) {
    return `SELECT email FROM users WHERE email='${email}'`;
  }

  insertNewUser(firstName, lastName, nickname, email) {
    return `INSERT INTO users (user_name, email, first_name, last_name) 
    VALUES ('${nickname}', '${email}', '${firstName}', '${lastName}')`;
  }

  updateToAdmin(email) {
    return `UPDATE users SET type='admin' WHERE email='${email}'`;
  }
}