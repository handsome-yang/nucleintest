import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/index'
import '../public/plugins/webuploader-0.1.5/webuploader.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
