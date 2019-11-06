import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { plugin } from 'vue-function-api'
import ViewUi from 'view-design'
import filters from './filters'
import 'view-design/dist/styles/iview.css'
import './styles/main.less'

Vue.config.productionTip = false

Vue.use(plugin)
Vue.use(ViewUi)

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
