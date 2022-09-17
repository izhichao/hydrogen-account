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
        component: () => import(/* webpackChunkName: "home" */ './views/Home/HomeView.vue'),
        meta: {
          index: 0
        }
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import(/* webpackChunkName: "show" */ './views/Show/ShowView.vue'),
        meta: {
          index: 1
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import(/* webpackChunkName: "my" */ './views/My/MyView.vue'),
        meta: {
          index: 2
        }
      }
    ],
    meta: {
      index: 999
    }
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import(/* webpackChunkName: "chart" */ './views/Common/ChartListView.vue'),
    meta: {
      index: -1
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ './views/Common/ListView.vue'),
    meta: {
      index: -2
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ './views/Common/DetailView.vue'),
    meta: {
      index: -3
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ './views/My/CategoryView.vue'),
    meta: {
      index: -1
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import(/* webpackChunkName: "help" */ './views/My/HelpView.vue'),
    meta: {
      index: -1
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
