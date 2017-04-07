import axios from 'axios';

const routes = {
  'cloudinarySend': '/cloudinarySend',
  'galleryStore': '/kairosGalleryStore',
  'recognize': '/kairosGalleryRecognize'
};

const post = (routeName, message) => {
  return axios.post(routes[routeName], message);
};

const get = (routeName) => {
  return axios.get(routes[routeName]);
};

export { post, get };
