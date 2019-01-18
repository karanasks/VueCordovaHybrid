import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LeafletMap from '@/components/LeafletMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/LeafletMap',
      name: 'LeafletMap',
      component: LeafletMap
    }
  ]
})
