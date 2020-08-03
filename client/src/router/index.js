import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from './auth';
import Login from '../views/Login.vue';
import NewAccount from '../views/NewAccount.vue';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/app',
    name: 'Main',
    component: Main,
    beforeEnter(to, from, next) {
      Auth.appAccess(to, from, next);
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Entrar'
    },
    beforeEnter(to, from, next) {
      Auth.loginPage(to, from, next);
    }
  },
  {
    path: '/new-account',
    name: 'NewAccount',
    component: NewAccount,
    meta: {
      title: 'Nova Conta'
    },
    beforeEnter(to, from, next) {
      Auth.newAccountPage(to, from, next);
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// Redefine o titulo de cada página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Note-Taking';
  next();
});

export default router;
