import axios from 'axios';

const getUserData = async function() {
  try {
    const { data } = await axios.get('/retrieveUserData');
    const loggedIn = data !== 'not logged in';
    const admin = data[0].type === 'admin';
    let status = { isLoggedIn: false, isAdmin: false };
    if (loggedIn && admin) {
      status.isLoggedIn = true;
      status.isAdmin = true;
    } else if (loggedIn) {
      status.loggedIn = true;
    }
    return status;
  } catch (err) {
    // todo: better error handling in client
    console.error(err);
  }
}

export { getUserData };