// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 全局前置导航钩子 beforeEach
// 会在路由即将改变前触发
router.beforeEach((to, from, next) => {
  let isLogin = window.localStorage.getItem('token')
  console.log(isLogin)
  if (isLogin) {
    next()
  } else {
    if (to.path === '/index') {
      next()
    } else {
      Message.error('没有访问权限或登录已过期，请重新登录！')
      next('/login')
    }
  }
})
