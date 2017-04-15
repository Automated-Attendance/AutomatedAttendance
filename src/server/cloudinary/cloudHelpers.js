import cloudinary from 'cloudinary';
import Promise from 'bluebird';

Promise.promisifyAll(cloudinary);

exports.upload = async ({ studentPhoto, studentUserName, img }) => {
  try {
    let options = { format: 'png', 'public_id': 'temporary' }
    if (!img) {
      options.public_id = studentUserName;
      img = studentPhoto;
    }
    return await cloudinary.v2.uploader.upload(img, options);
  } catch (err) {
    console.error(err.message);
  }
};