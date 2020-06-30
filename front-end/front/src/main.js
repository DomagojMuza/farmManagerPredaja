import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
