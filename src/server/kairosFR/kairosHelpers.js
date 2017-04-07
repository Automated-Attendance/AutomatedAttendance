import Kairos from 'kairos-api';
const client = new Kairos(process.env.KAIROS_APP_ID, process.env.KAIROS_APP_KEY);



exports.storeInGallery = (req, res) => {
  const params = {
    'image': req.body.img,
    'subject_id': 'JasonImage',
    'gallery_name': 'TestGallery'
  };

  client.enroll(params)
    .then((response) => res.send(response))
    .catch((err) => res.status(500).send(err));
};

exports.recognize = (req, res) => {
  const params = {
    'image': req.body.img,
    'gallery_name': 'TestGallery'
  };

  client.recognize(params)
    .then((response) => res.send(response))
    .catch((err) => res.status(500).send(err));
};