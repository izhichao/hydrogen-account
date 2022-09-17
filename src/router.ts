import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ './views/Common/IndexView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ './views/Home/HomeView.vue')
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import(/* webpackChunkName: "show" */ './views/Show/ShowView.vue')
      },
      { path: 'my', name: 'My', component: () => import(/* webpackChunkName: "my" */ './views/My/MyView.vue') }
    ]
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ './views/Common/ListView.vue')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import(/* webpackChunkName: "chart" */ './views/Common/ChartListView.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ './views/Common/DetailView.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ './views/My/CategoryView.vue')
  },
  { path: '/help', name: 'Help', component: () => import(/* webpackChunkName: "help" */ './views/My/HelpView.vue') }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
