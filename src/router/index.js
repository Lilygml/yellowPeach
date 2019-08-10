import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index/list'
    }, {
      path: '/index/list',
      name: '列表',
      component: resolve => require(['@/views/list.vue'], resolve)
    }, {
      path: '/index/edit',
      name: '编辑',
      component: resolve => require(['@/views/edit.vue'], resolve)
    }
  ]
})
