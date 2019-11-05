import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import store from './store'
import { plugin } from 'vue-function-api'
import ViewUi from 'view-design'
import 'view-design/dist/styles/iview.css'
import './styles/main.less'

Vue.config.productionTip = false

Vue.use(plugin)
Vue.use(ViewUi)

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
