import axios from 'axios';

const routes = {
  'search': '/search',
  'studentInformation': '/studentInformation',
  'studentUpload': '/studentUpload'
};

const post = (routeName, message) => {
  return axios.post(routes[routeName], message);
};

const get = (routeName) => {
  return axios.get(routes[routeName]);
};

export { post, get };
