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
  console.log('student removal request');
  console.log(studentData);
  try {
    const response = await axios.post('/removeStudent', studentData);
    return response.status === 201;
  } catch (err) {
    // todo: better error handling
    console.warn(err);
  }

};

const getStudentInCertainClasses = async (classes) => {
  try {
    const splitClasses = classes.split(',');
    const reponse = await axios.post('/getStudentWithCertainClasses', { classes: splitClasses});
    return reponse.status === 201;
  } catch (err) {
    // todo: better error handling
    console.warn(err);
  }
};

const getLateStudents = async () => {
  try {
    const response = await axios.post('/getLateStudents');
    return response.status === 201;
  } catch (err) {
    console.warn(err);
  }
}

export { storeStudentData, getStudentInCertainClasses, getLateStudents, removeStudentData };
