const BASE_URL = 'http://localhost:2030';

export default {
  BASE_URL,
  LOGIN_URL: `${BASE_URL}/user/login`,
  REGISTER_URL: `${BASE_URL}/user/register`,
  ADD_PRESCRIPTION_URL: `${BASE_URL}/prescriptions/add`,
  GET_PRESCRIPTION_URL: `${BASE_URL}/prescriptions`,
  GET_PRESCRIPTION_HISTORY_URL: `${BASE_URL}/history`,
  DELETE_PRESCRIPTION_URL: `${BASE_URL}/prescriptions/`,
};
