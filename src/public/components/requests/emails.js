import axios from 'axios';

// const getEmails = async function () {
//   try {
//     const response = await axios.post('/getAllUsers');

//   }
// }

const sendEmails = async function() {
  try {
    const response = await axios.post('/emailStudents');
    return response.status === 201;
  } catch (err) {
    console.warn(err);
  }
};

export { sendEmails };