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
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: 'test' */ '@/layout/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
