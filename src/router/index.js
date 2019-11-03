import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import Welcome from '@/views/welcome'
import Error404 from '@/views/404'
import local from '@/utils/local'
import article from '@/views/article'
import Image from '@/views/image'

Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
const router = new VueRouter({

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
      path: '/article',
      component: article
    },
    {
      path: '/image',
      component: Image
    },
    {
      path: '*',
      component: Error404
    }
    ]
  }

  ]
})
// 路由导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (to.path !== '/login' && !user) {
    return next('/login')
  }
  next()
})
export default router
