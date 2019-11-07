import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { plugin } from 'vue-function-api'
import ViewUi from 'view-design'
import filters from './filters'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'view-design/dist/styles/iview.css'
import './styles/main.less'

Vue.config.productionTip = false

Vue.use(plugin)
Vue.use(ViewUi)

// 简单的进度条配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
