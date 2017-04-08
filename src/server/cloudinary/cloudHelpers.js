import cloudinary from 'cloudinary';

exports.post = (req, res) => {
  const screenshot = req.body.img;
  const options = {
    format: 'png',
    public_id: 'temporary'
  };
  cloudinary.v2.uploader.upload(screenshot, options, (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
};

exports.upload = (req,res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let studentPhoto = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  studentPhoto.mv(__dirname + '/temp/studentPhoto.jpg', function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
}