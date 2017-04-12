import axios from 'axios';

const getStudentInCertainClasses = async (classes) => {
  try {
    const splitClasses = classes.split(',');
    const reponse = await axios.post('/getStudentWithCertainClasses', { classes: splitClasses});
    return reponse.status === 201;
  } catch (err) {
    console.warn(err);
  }
}

export { getStudentInCertainClasses };