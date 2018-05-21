import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Game from '@/components/common/guess/game'
import Rank from '@/components/common/guess/ranking'
import Team from '@/components/common/guess/team'
import Group from '@/components/common/guess/game/game-group'
Vue.use(Router)

var defaultDate = '06-14';
var date = new Date();
var month = date.getMonth();
var day = date.getDate();
if(month+1<6)
{
  month = '6';
  day   = '14';
  defaultDate = '0'+month+'-'+day;
}
else
  {
    defaultDate = '0'+month+'-'+day;
  }
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/game',
      children:[
      {
        path: 'game',
        name: 'game',
        component: Game
      },
      {
        path: 'ranking',
        name: 'ranking',
        component: Rank,
      },
      {
        path: 'team',
        name: 'team',
        component: Team,
      }]
    }
  ]
})
