import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import Welcome from '@/views/welcome'
import Error404 from '@/views/404'

Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new VueRouter({

  routes: [{
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: home,
    children: [{
      path: '/',
      component: Welcome
    },
    {
      path: '*',
      component: Error404
    }
    ]
  }

  ]
})
