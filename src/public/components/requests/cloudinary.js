import axios from 'axios';

const cloudinaryUpload = async function(screenshot) {
  try {
    const { data } = await axios.post('/cloudinarySend', { img: screenshot });
    return { screenshotURL: data.secure_url };
  } catch (err) {
    // todo: handle errors better
    console.error(err);
  }
};

export { cloudinaryUpload };