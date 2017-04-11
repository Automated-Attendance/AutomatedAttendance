import axios from 'axios';

const getAttendanceRecords = async (queryType) => {
  try {
    const { data } = await axios.post('/getStudentData', queryType);
    return data;
  } catch (err) {
    // todo: better error handling
    console.error(err);
  }
};

const getClasses = async () => {
  try {
    const { data } = await axios.get('/getClassData');
    let classes = data[0].map((className) => className.class_name);
    return { classes: classes };
  } catch (err) {
    console.error(err)
  }
}

const addClasses = async (className) => {
  try {
    await axios.post('/addClass', className);
  } catch (err) {
    console.error(err);
  }
}

export { getAttendanceRecords, getClasses, addClasses };