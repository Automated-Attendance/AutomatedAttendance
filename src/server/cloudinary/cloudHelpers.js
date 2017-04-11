import cloudinary from 'cloudinary';
import Promise from 'bluebird';

Promise.promisifyAll(cloudinary);

exports.post = async (req, res) => {
  try {
    const { img } = req.body;
    const options = { format: 'png', public_id: 'temporary' };
    const result = await cloudinary.v2.uploader.upload(img, options);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.upload = async (req, res, next) => {
  try {
    const { studentPhoto } = req.body;
    const options = { format: 'png' }
    const { url } = await cloudinary.v2.uploader.upload(studentPhoto, options);
    req.body.imageLink = url;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};