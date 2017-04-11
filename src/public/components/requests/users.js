import axios from 'axios';

const getUserData = async () => {
  try {
    const { data } = await axios.get('/retrieveUserData');
    const loggedIn = data !== 'not logged in';
    const admin = data[0].type === 'admin';
    let status = { isLoggedIn: false, isAdmin: false, userEmail: null };
    if (loggedIn && admin) {
      status.isAdmin = true;
    }

    if (loggedIn) {
      status.isLoggedIn = true;
      status.userEmail = data[0].email;
    }

    return status;
  } catch (err) {
    // todo: better error handling in client
    console.error(err);
  }
};

export { getUserData };