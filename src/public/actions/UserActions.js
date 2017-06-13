import axios from 'axios';
import { 
  GET_LOGIN_STATUS,
  ERROR_GETTING_USER,
  GET_ALL_USERS
} from './types';

export function getLoginStatus() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/retrieveUserData');
      const loggedIn = data !== 'not logged in';
      const admin = data[0].type === 'admin';
      const status = { isLoggedIn: false, isAdmin: false, userEmail: null };

      if (loggedIn) {
        if (admin) status.isAdmin = true;
        status.isLoggedIn = true;
        status.userEmail = data[0].email;
      }

      dispatch({ type: GET_LOGIN_STATUS, payload: status });
    } catch (err) {
      dispatch({ type: ERROR_GETTING_USER, payload: err });
    }

  }
}

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/allUsers');
      const userList = data.map(user => {
        const { first_name, last_name, user_name } = user;
        return { 
          label: `${first_name} ${last_name} - ${user_name}`,
          value: user_name 
        };
      });
      console.log(userList)
      dispatch({ type: GET_ALL_USERS, payload: userList}) 
    } catch (err) {
      dispatch({ type: ERROR_GETTING_USER, payload: err });
    }
  }
}