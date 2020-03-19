import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import constants from '../constants';
import { HTTP } from '../lib';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      token: localStorage.getItem('authorization_token'),
      user: null,
      status: 'default',
    },
    prescriptions: {
      status: '',
      data: [],
      history: {
        data: [],
      },
    },
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.auth.status = 'loading';
    },
    AUTH_SUCCESS(state, { token, user }) {
      state.auth.status = 'success';
      state.auth.token = token;
      state.auth.user = user;
    },
    AUTH_ERROR(state, error) {
      state.auth.status = 'error';
      state.auth.error = error;
    },
    DATA_REQUEST(state, field) {
      state[field].status = 'loading';
    },
    GET_PRESCRIPTIONS(state, data) {
      if (Array.isArray(data)) {
        state.prescriptions.data = data;
      }
    },
    GET_PRESCRIPTIONS_HISTORY(state, data) {
      if (Array.isArray(data)) {
        state.prescriptions.history.data = data;
      }
    },
    NEW_PRESCRIPTION(state, data) {
      state.prescriptions.data.unshift(data);
    },
    DELETE_PRESCRIPTION(state, id) {
      for (let i = state.prescriptions.data.length - 1; i >= 0; --i) {
        if (state.prescriptions.data[i]._id === id) {
          state.prescriptions.data.splice(i, 1);
        }
      }
    },
    LOGOUT(state) {
      state.auth.status = '';
      state.auth.token = null;
    },
  },
  actions: {
    login({
      commit,
    }, data) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        HTTP.post(constants.LOGIN_URL, data)
          .then((resp) => {
            const { accessToken } = resp.data;
            const { user } = resp.data;
            localStorage.setItem('authorization_token', accessToken);
            axios.defaults.headers.common.Authorization = accessToken;
            commit('AUTH_SUCCESS', { token: accessToken, user });
            resolve(resp);
          })
          .catch((err) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('authorization_token');
            reject(err);
          });
      });
    },
    register({
      commit,
    }, data) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        HTTP.post(constants.REGISTER_URL, data)
          .then((resp) => {
            const { accessToken } = resp.data;
            const { user } = resp.data;
            localStorage.setItem('authorization_token', accessToken);
            HTTP.defaults.headers.common.Authorization = accessToken;
            commit('AUTH_SUCCESS', accessToken, user);
            resolve(resp);
          })
          .catch((err) => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('authorization_token');
            reject(err);
          });
      });
    },
    logout({
      commit,
    }) {
      return new Promise((resolve) => {
        commit('LOGOUT');
        localStorage.removeItem('authorization_token');
        delete HTTP.defaults.headers.common.Authorization;
        resolve();
      });
    },
    getPrescriptions({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        commit('DATA_REQUEST', 'prescriptions');
        HTTP.get(constants.GET_PRESCRIPTION_URL)
          .then((resp) => {
            commit('GET_PRESCRIPTIONS', resp.data);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addPrescription({
      commit,
    }, data) {
      return new Promise((resolve, reject) => {
        commit('DATA_REQUEST', 'prescriptions');
        HTTP.post(constants.ADD_PRESCRIPTION_URL, data)
          .then((resp) => {
            commit('NEW_PRESCRIPTION', resp.data);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deletePrescription({
      commit,
    }, data) {
      return new Promise((resolve, reject) => {
        HTTP.delete(constants.DELETE_PRESCRIPTION_URL + data._id)
          .then((resp) => {
            commit('DELETE_PRESCRIPTION', data._id);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getPrescriptionsHistory({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        commit('DATA_REQUEST', 'prescriptions');
        HTTP.get(constants.GET_PRESCRIPTION_HISTORY_URL)
          .then((resp) => {
            commit('GET_PRESCRIPTIONS_HISTORY', resp.data);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.auth.token,
    authStatus: (state) => state.auth.status,
    token: (state) => state.auth.token,
    prescriptions: (state) => state.prescriptions.data,
    prescriptionsHistory: (state) => state.prescriptions.history.data,
  },
});
