import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import store from './store'
import { plugin } from 'vue-function-api'
import './styles/main.less'

Vue.config.productionTip = false

Vue.use(plugin)

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
