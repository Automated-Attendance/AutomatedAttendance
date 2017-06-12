import { getUserData } from '../requests/users';
import { 
  FETCH_LOGIN_STATUS,
  ERROR_FETCHING_USER
} from '../actions/types';


const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userEmail: null
};

export default function userAuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ERROR_FETCHING_USER: 
      return state;
    case FETCH_LOGIN_STATUS:
      return payload;
    default:
      return state;
  }
}
