import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import(/* webpackChunkName: "home" */ './views/HomeView.vue') },
  { path: '/show', name: 'Show', component: () => import(/* webpackChunkName: "show" */ './views/ShowView.vue') },
  { path: '/my', name: 'My', component: () => import(/* webpackChunkName: "my" */ './views/MyView.vue') },
  { path: '/category', name: 'Category', component: () => import(/* webpackChunkName: "category" */ './views/CategoryView.vue') },
  { path: '/list', name: 'List', component: () => import(/* webpackChunkName: "list" */ './views/ListView.vue') }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
