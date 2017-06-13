import { 
  GET_LOGIN_STATUS,
  ERROR_GETTING_USER,
  GET_ALL_USERS
} from '../actions/types';


const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userEmail: null,
  studentOptions: []
};

export default function userAuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_USERS:
    console.log(state, payload)
      return { ...state, studentOptions: payload };
    case ERROR_GETTING_USER: 
      return state;
    case GET_LOGIN_STATUS:
      return payload;
    default:
      return state;
  }
}
