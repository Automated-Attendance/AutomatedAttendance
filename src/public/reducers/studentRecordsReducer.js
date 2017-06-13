import {
  GET_STUDENT_RECORDS,
  UPDATE_STUDENT_CLASS,
  UPDATE_STUDENT_STATUS
} from '../actions/types';

const initialState = {
  attendance: [],
  classes: {},
  statuses: {},
  attendanceInterval: null
};

export default function studentRecordsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_STUDENT_RECORDS:
      return { ...state, attendance: payload };
    case UPDATE_STUDENT_STATUS:
      return { ...state, statuses: payload };
    case UPDATE_STUDENT_CLASS:
      return { ...state, classes: payload };
    default: 
      return state;
  }
}
