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
    return response.status === 200;
  } catch (err) {
    // todo: better error handling
    console.warn(err);
  }

};

const storeAttendanceRecord = async (classes, time) => {
  try {
    const response = await axios.post('/storeAttendanceRecord', { classes: classes.split(','), time: time });
    return response.status === 201;
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

const changeAttendanceStatus = async (data) => {
  try {
    const response = await axios.post('/changeAttendanceStatus', {data: data});
    return response.status === 201;
  } catch (err) {
    console.warn(err);
  }
}

const changeUserType = async (data) => {
  try {
    const response = await axios.post('/changeUserType', {data: data});
    return response.status === 201;
  } catch (err) {
    console.warn(err);
  }
}

const getStudentsByClass = async (className) => {
  try {
    const { data } = await axios.get(`/studentsByClass?class=${className}`);
    return data.map((user) => {
      return { label: user.first_name + ' ' + user.last_name + ' - ' + user.user_name, value: user.user_name };
    });
  } catch (err) {
    console.warn(err);
  }
}

export {
  storeStudentData,
  storeAttendanceRecord,
  emailLateStudents,
  removeStudentData,
  changeAttendanceStatus,
  getStudentsByClass
};
