import axios from 'axios';
import {
  GET_STUDENT_RECORDS,
  UPDATE_STUDENT_CLASS,
  UPDATE_STUDENT_STATUS
} from './types';



export function getAttendance(email) {
  return async (dispatch, getState) => {
    try {
      const { statuses, classes } = getState().studentRecords;
      const { data } = await axios.get(`/attendanceRecords?type=studentAttendance&email=${email}`);

      const studentRecords = data.map(item => {
        const { class_name, status, first_name, last_name } = item;
        const fullName = `${first_name}${last_name !== 'undefined' ? ' ' + last_name : ''}`;
        item.full_name = fullName;

        if (!classes[class_name]) {
          classes[class_name] = class_name;
          dispatch({ type: UPDATE_STUDENT_CLASS, payload: classes})
        }

        if (!statuses[status]) {
          statuses[status] = status;
          dispatch({ type: UPDATE_STUDENT_STATUS, payload: statuses });
        }

        return item;
      });

      dispatch({ type: GET_STUDENT_RECORDS, payload: studentRecords });
    } catch (err) {
      // todo: better error handling
      console.error(err);
    }
  }
}