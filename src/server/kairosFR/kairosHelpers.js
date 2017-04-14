import Kairos from 'kairos-api';
const client = new Kairos(process.env.KAIROS_APP_ID, process.env.KAIROS_APP_KEY);



exports.storeInGallery = async (req, res) => {
  try {
    const { studentUserName, selectedClass, imageLink } = req.body;
    const params = { 'image': imageLink, 'subject_id': studentUserName, 'gallery_name': selectedClass }
    const data = await client.enroll(params);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.recognize = async (req, res, next) => {
  try {
    const params = { 'image': req.body.imageLink, 'gallery_name': 'hrsf72' };
    const { body } = await client.recognize(params);
    if (body.Errors) {
      res.send(body.Errors);
    } else {
      req.body.matches = body.images;
      next();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.removeGallery = async (className) => {
  const options = { 'gallery_name': className };
  return await client.galleryRemove(options);
}

exports.test = async (req, res) => {
  const galleries = await client.galleryListAll();
  res.send(galleries);
}

exports.testGalleryList = async (req, res) => {
  const options = { 'gallery_name': req.params.galleryName };
  const galleries = await client.galleryView(options);
  res.send(galleries);
}

exports.testGalleryRemove = async (req, res) => {
  const options = { 'gallery_name': req.params.galleryName };
  const clearedStatus = await client.galleryRemove(options);
  res.send(clearedStatus);
}

exports.galleryRemoveUser = async ({ studentUserName, className }) => {
  const options = { subject_id: studentUserName, gallery_name: className};
  return await client.galleryRemoveSubject(options);
};


