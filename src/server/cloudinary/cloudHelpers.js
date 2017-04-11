import cloudinary from 'cloudinary';

exports.post = (req, res) => {
  const screenshot = req.body.img;
  const options = {
    format: 'png',
    public_id: 'temporary'
  };
  cloudinary.v2.uploader.upload(screenshot, options, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
};

exports.upload = (req, res, next) => {
  const { studentName, studentEmail, studentPhoto, selectedClass } = req.body;
  const options = {
    format: 'png'
  };
  cloudinary.v2.uploader.upload(studentPhoto, options, (err, result) => {
    if (err) { 
      res.status(500).send(err);
    } else {
      req.body.link = result.url;
      next();
    }
  });
};