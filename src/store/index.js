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
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.auth.status = 'loading';
    },
    AUTH_SUCCESS(state, { token, user }) {
      console.log(token);
      state.auth.status = 'success';
      state.auth.token = token;
      state.auth.user = user;
    },
    AUTH_ERROR(state, error) {
      state.auth.status = 'error';
      state.auth.error = error;
    },
    LOGOUT(state) {
      state.auth.status = '';
      state.auth.token = '';
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
            console.log(user);
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
  },
  getters: {
    isLoggedIn: (state) => !!state.auth.token,
    authStatus: (state) => state.auth.status,
    token: (state) => state.auth.token,
  },
});
