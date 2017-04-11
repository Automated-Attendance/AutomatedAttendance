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

const getClasses = async function() {
  try {
    const { data } = await axios.get('/getClassData');
    let classes = data[0].map((className) => className.class_name);
    return { classes: classes };
  } catch (err) {
    console.error(err)
  }
}

export { getAttendanceRecords, getClasses };