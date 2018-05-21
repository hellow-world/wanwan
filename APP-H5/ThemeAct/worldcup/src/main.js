// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueTouch from 'vue-touch'
require('../static/reset.css')

Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$http=axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
//全局过滤器 日期格式化
Vue.filter('dateFormat',function(val)
{
  let month = val.substring(5,7)
  let day   = val.substring(8,10)
  let hour  = val.substring(11,13)
  let min   = val.substring(14,16)
  let sec   = val.substring(17,19)
  return month + '.' + day + ' ' + hour + ':' + min + ":" + sec;
})
//全局变量
global.usertoken='xgKdSzzSrMLz5wyYzqyRiEPjh4n0whFXAHxI0RRBfEzuEeeHYxN3EzQ3fLyoCBAKOWD+FZFySs+v67lWkRSqQVNOHe1H8xadEExDcO2Lwc3S4x5zPCvvDJfhGmE7IB8C4q+l8MWwEQeJr80KesYFKreQBQWJ9NKZG778A2ld6lY=';
global.basePath = 'https://api.wanwantech.cn:18443/';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
