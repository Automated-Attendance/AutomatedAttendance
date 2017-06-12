import { getUserData } from '../requests/users';
import { FETCH_LOGIN_STATUS } from '../actions/types';



export default function userAuthReducer(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_LOGIN_STATUS:

    default:
      return state;
  }
}