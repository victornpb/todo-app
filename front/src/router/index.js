import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

function ensureAuth(to, from, next) {
  if (store.getters.isLogged) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

const routes = [
  { path: '/', redirect: '/board' },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: { title: 'Register' },
  },
  {
    path: '/board',
    name: 'Board',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Board.vue'),
    beforeEnter: ensureAuth,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
