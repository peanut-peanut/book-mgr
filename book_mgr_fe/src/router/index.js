import { createRouter, createWebHashHistory } from 'vue-router';
import { character } from '@/service';
import store from '@/store';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "auth" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'books',
        name: 'Books',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Books/index.vue'),
      },
      {
        path: 'books/:id',
        name: 'BookDetail',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Books/BookDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "auth" */ '../views/User/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*
to: 下一个页面/即将要进入的目标
from：从哪个路由离开
next：路由的控制参数，next(true)和next(false)
*/
router.beforeEach(async (to, from, next) => {
  if (!store.state.characterInfo.length) {
    store.dispatch('getCharacterInfo');
    window.store = store;
  }
  store.dispatch('getUserInfo');
  next();
});

export default router;
