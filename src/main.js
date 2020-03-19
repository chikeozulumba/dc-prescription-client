import Vue from 'vue';
import VueRouter from 'vue-router';
import VueToast from 'vue-toast-notification';
import VCalendar from 'v-calendar';
import { TimePicker, Select, Option } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

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
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.component('el-time-select', TimePicker);
Vue.component('el-select', Select);
Vue.component('el-option', Option);
locale.use(lang);

new Vue({
  render: (h) => h(App),
  store,
  router,
  // provide: () => ({
  //   $http: HTTP,
  // }),
}).$mount('#app');
