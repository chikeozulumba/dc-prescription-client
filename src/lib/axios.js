/* eslint-disable no-param-reassign */
import axios from 'axios';
import constants from '../constants';

const http = axios.create({
  baseURL: constants.BASE_URL,
});

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('authorization_token')}`;
  return request;
};

http.interceptors.request.use(
  (request) => requestHandler(request),
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.statusCode === 401) {
      localStorage.removeItem('authorization_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default http;
