import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import(/* webpackChunkName: "home" */ './views/Home/HomeView.vue') },
  { path: '/show', name: 'Show', component: () => import(/* webpackChunkName: "show" */ './views/Show/ShowView.vue') },
  { path: '/my', name: 'My', component: () => import(/* webpackChunkName: "my" */ './views/My/MyView.vue') }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
