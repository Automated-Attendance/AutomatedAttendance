import cloudinary from 'cloudinary';
import Promise from 'bluebird';

Promise.promisifyAll(cloudinary);

exports.upload = async (req, res, next) => {
  try {
    let { studentPhoto, studentUserName, img } = req.body;
    let options = { format: 'png', 'public_id': 'temporary' }
    if (!img) {
      options.public_id = studentUserName;
      img = studentPhoto;
    }
    const { url } = await cloudinary.v2.uploader.upload(img, options);
    req.body.imageLink = url;
    delete req.body.img;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};