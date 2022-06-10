import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '', name: 'Home', component: () => import(/* webpackChunkName: "home" */ './views/Home/HomeView.vue') },
  { path: '', name: 'Show', component: () => import(/* webpackChunkName: "show" */ './views/Show/ShowView.vue') },
  { path: '', name: 'My', component: () => import(/* webpackChunkName: "my" */ './views/My/MyView.vue') }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // 当没有token时，且访问的页面不是登录注册页时，跳转到登录页
  if (!token && to.name !== 'Login') {
    next({ name: 'Login' });
  } else if (token && to.name === 'Login') {
    next({ name: 'Index' });
  } else {
    next();
  }
});

export default router;
