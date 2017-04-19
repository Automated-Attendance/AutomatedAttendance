import axios from 'axios';

const getAttendanceRecordDate = async ({date}) => {
  try {
    const response = await axios.get(`/getAttendanceRecordDate?date=${date}`) 
    return response.status === 200;
  } catch (err){
    console.error(err);
  }
}

const getAttendanceRecords = async (queryData) => {
  try {
    const { queryType, email } = queryData;
    const { data } = await axios.get(`/attendanceRecords?type=${queryType}&email=${email}`);
    return data;
  } catch (err) {
    // todo: better error handling
    console.error(err);
  }
};

const getClasses = async () => {
  try {
    const { data } = await axios.get('/classList');
    let classes = data[0].map((className) => className.class_name);
    return { classes: classes };
  } catch (err) {
    console.error(err.message);
  }
};

const addClasses = async (className) => {
  try {
    const response = await axios.post('/addClass', className);
    return response.status === 201;
  } catch (err) {
    console.error(err);
  }
};

const removeClasses = async (className) => {
  try {
    const response = await axios.post('/removeClass', className);
    return response.status === 200;
  } catch (err) {
    console.error(err);
  }
};

const getEnrollment = async () => {
  try {
    const { data } = await axios.get('/getEnrollment');
    let enrollment = data[0].map((record) => {
      return {
        class: record.class_name,
        student: `${record.first_name} ${record.last_name}`
      };
    });
    return {enrollment: enrollment};
  } catch (err) {
    console.error(err);
  }
}

export { getAttendanceRecords, getClasses, addClasses, removeClasses, getEnrollment, getAttendanceRecordDate };