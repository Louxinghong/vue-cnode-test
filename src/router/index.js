import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: 'dashboard' */ '@/views/dashboard/index.vue'
          )
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    redirect: '/user/user-detail/:loginname',
    children: [
      {
        path: 'user-detail/:loginname',
        name: 'UserDetail',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
