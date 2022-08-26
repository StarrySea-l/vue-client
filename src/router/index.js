import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Login/Index'
import Home from '@/views/main/Home'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/index')
  } else {
    if (to.name !== 'index') {
      if (window.localStorage.getItem('token') != null) {
        next()
      } else {
        next('/index')
      }
    } else {
      next()
    }
  }
})

export default router
