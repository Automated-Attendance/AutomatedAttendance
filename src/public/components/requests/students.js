import axios from 'axios';

const storeStudentData = async (studentData) => {
  try {
    const response = await axios.post('/studentUpload', studentData);
    return response.status === 201;
  } catch (err) {
    // todo: better error handling
    console.warn(err);
  }
};

const removeStudentData = async (studentData) => {
  try {
    const response = await axios.post('/removeStudent', studentData);
    return response.status === 201;
  } catch (err) {
    // todo: better error handling
    console.warn(err);
  }

};

const storeAttendanceRecord = async (classes) => {
  try {
    const reponse = await axios.post('/storeAttendanceRecord', { classes: classes.split(',') });
    return reponse.status === 201;
  } catch (err) {
    // todo: better error handling
    console.warn(err);
  }
};

const emailLateStudents = async () => {
  try {
    const response = await axios.post('/emailLateStudents');
    return response.status === 201;
  } catch (err) {
    console.warn(err);
  }
}

export { storeStudentData, storeAttendanceRecord, emailLateStudents, removeStudentData };
