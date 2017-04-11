import axios from 'axios';

const getAttendanceRecords = async function(queryType) {
  try {
    const { data } = await axios.post('/getStudentData', queryType);
    return data;
  } catch (err) {
    // todo: better error handling
    console.error(err);
  }
};

export { getAttendanceRecords };