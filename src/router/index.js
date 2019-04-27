import Vue from 'vue'
import Router from 'vue-router'
import map from '@/view/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '996map',
      component: map
    }
  ]
})
