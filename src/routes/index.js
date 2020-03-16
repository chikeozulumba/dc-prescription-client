import VueRouter from 'vue-router';
import STORE from '../store';

const Authenticate = (_to, from, next) => {
  if (_to.meta?.protected === true) {
    // const authorization = STORE.getters.isLoggedIn;
    if (!(STORE.getters.authStatus === 'success') && typeof STORE.getters.token !== 'string') {
      console.log('here');
      return next('/login');
    }
  }
  return next();
};

export default new VueRouter({
  routes: [
    {
      path: '/',
      to: '/',
      name: 'dashboard',
      component: () => import('../pages/Dashboard.vue'),
      meta: {
        protected: true,
      },
      beforeEnter: Authenticate,
    },
    {
      path: '/history',
      to: '/history',
      name: 'history',
      component: () => import('../pages/History.vue'),
      meta: {
        protected: true,
      },
      beforeEnter: Authenticate,
    },
    {
      path: '/settings',
      to: '/settings',
      name: 'settings',
      component: () => import('../pages/Settings.vue'),
      meta: {
        protected: true,
      },
      beforeEnter: Authenticate,
    },
    {
      path: '/login',
      to: '/login',
      name: 'auth/login',
      component: () => import('../pages/auth/Login.vue'),
      meta: {
        protected: false,
      },
      beforeEnter: (_to, from, next) => {
        if ((STORE.getters.authStatus === 'success') || typeof STORE.getters.token === 'string') {
          return next('/');
        }
        return next();
      },
    },
    {
      path: '/register',
      to: '/register',
      name: 'auth/register',
      component: () => import('../pages/auth/Register.vue'),
      meta: {
        protected: false,
      },
      beforeEnter: (_to, from, next) => {
        if ((STORE.getters.authStatus === 'success') || typeof STORE.getters.token === 'string') {
          return next('/');
        }
        return next();
      },
    },
  ],
});
