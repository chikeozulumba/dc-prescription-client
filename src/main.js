import Vue from 'vue';
import VueRouter from 'vue-router';
import VueToast from 'vue-toast-notification';

import store from './store';
import { HTTP } from './lib';
import router from './routes';

import App from './App.vue';

import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$http = HTTP;
Vue.prototype.$eventBus = new Vue();

Vue.use(VueToast);


new Vue({
  render: (h) => h(App),
  store,
  router,
  // provide: () => ({
  //   $http: HTTP,
  // }),
}).$mount('#app');
