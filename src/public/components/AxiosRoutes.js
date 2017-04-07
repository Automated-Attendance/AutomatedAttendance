import axios from 'axios';

const routes = {
  'cloudinarySend': '/cloudinarySend'
};

const post = (routeName, message) => {
  return axios.post(routes[routeName], message);
};

const get = (routeName) => {
  return axios.get(routes[routeName]);
};

export { post, get };
