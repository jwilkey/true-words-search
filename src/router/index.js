import Vue from 'vue'
import Router from 'vue-router'
import TextCrossReference from '@/layouts/TextCrossReference'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TextCrossReference',
      component: TextCrossReference
    }
  ]
})
