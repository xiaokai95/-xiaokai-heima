import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from '@/router'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from '@/api'
import plugin from '@/components'
Vue.use(plugin)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUi)
new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
