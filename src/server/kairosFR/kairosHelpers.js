import Kairos from 'kairos-api';
const client = new Kairos(process.env.KAIROS_APP_ID, process.env.KAIROS_APP_KEY);



exports.storeInGallery = async (req, res) => {
  try {
    const { studentName, selectedClass, imageLink } = req.body;
    const params = { 'image': imageLink, 'subject_id': studentName, 'gallery_name': selectedClass }
    const data = await client.enroll(params);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
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

exports.test = async (req, res) => {
  const galleries = await client.galleryListAll();
  res.send(galleries);
}