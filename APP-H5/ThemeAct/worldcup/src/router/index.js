import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Game from '@/components/common/guess/game'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/game',
      name: 'Home',
      component: Home,
      children:[
      {
        path: 'game',
        name: 'game',
        component: Game,
      }]
    }
  ]
})
