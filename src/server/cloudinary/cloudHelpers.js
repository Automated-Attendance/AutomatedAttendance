import cloudinary from 'cloudinary';
import Promise from 'bluebird';

Promise.promisifyAll(cloudinary);

exports.upload = async ({ studentPhoto, studentUserName, img }) => {
  try {
    let options = { format: 'png', 'public_id': 'temporary' }
    /* istanbul ignore else  */
    if (!img) {
      options.public_id = studentUserName;
      img = studentPhoto;
    }
    return await cloudinary.v2.uploader.upload(img, options);
  } catch (err) {
    /* istanbul ignore next  */
    res.status(500).send(err);
  }
};