import Kairos from 'kairos-api';
const client = new Kairos(process.env.KAIROS_APP_ID, process.env.KAIROS_APP_KEY);



exports.storeInGallery = async (studentUserName, selectedClass, imageLink) => {
  const params = { 'image': imageLink, 'subject_id': studentUserName, 'gallery_name': selectedClass };
  return await client.enroll(params);
};

exports.recognize = async (url) => {
  const params = { 'image': url, 'gallery_name': 'HRSF72' };
  const { body } = await client.recognize(params);
  return body.Errors ? console.log(body.Errors) : body.images;
};

exports.removeGallery = async (className) => {
  const options = { 'gallery_name': className };
  return await client.galleryRemove(options);
}

exports.testGalleryList = async (req, res) => {
  const options = { 'gallery_name': req.params.galleryName };
  const galleries = await client.galleryView(options);
  res.send(galleries);
}

exports.galleryRemoveUser = async ({ studentUserName, className }) => {
  const options = { subject_id: studentUserName.value, gallery_name: className};
  return await client.galleryRemoveSubject(options);
};
