import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';



const rootReducer = combineReducers({
  userStatus: userAuthReducer
});

export default rootReducer;
