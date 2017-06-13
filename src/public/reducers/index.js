import { combineReducers } from 'redux';
import userAuthReducer from './userAuthReducer';
import studentRecordsReducer from './studentRecordsReducer';



const rootReducer = combineReducers({
  userStatus: userAuthReducer,
  studentRecords: studentRecordsReducer
});

export default rootReducer;
