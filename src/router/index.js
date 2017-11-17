import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import TextCrossReference from '@/layouts/TextCrossReference'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/cross-reference',
      name: 'TextCrossReference',
      component: TextCrossReference
    }
  ]
})
