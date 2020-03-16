import axios from 'axios';
import constants from '../constants';

const http = axios.create({
  baseURL: constants.BASE_URL,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.statusCode === 401) {
      localStorage.removeItem('authorization_token');
      // window.location.href = '/auth';
    }
    return Promise.reject(error);
  },
);

export default http;
