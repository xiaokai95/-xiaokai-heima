import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import router from '@/router'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUi)

new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
