import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
