import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Demo1 from '@/components/Demo1'
import Demo2 from '@/components/Demo2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/demo2',
      name: 'Demo2',
      component: Demo2
    }
  ]
})
