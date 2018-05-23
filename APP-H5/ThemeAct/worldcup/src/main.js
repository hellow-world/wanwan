// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
require('../static/reset.css')
//vue-touch
Vue.use(VueTouch, {name: 'v-touch'})
//vue-awesome-swiper
Vue.use(VueAwesomeSwiper)
//axios库
Vue.prototype.$http=axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
//全局过滤器 日期格式化
Vue.filter('dateFormat',function(val)
{
  let month = val.substring(5,7);
  let day   = val.substring(8,10);
  let hour  = val.substring(11,13);
  let min   = val.substring(14,16);
  let sec   = val.substring(17,19);
  return month + '.' + day + ' ' + hour + ':' + min + ":" + sec;
})
//全局变量
global.usertoken='HwhfXEE/XB0q9xiywQYeCsvA0hAl4ITiwveWHDkTaMv42fjfW2Tbe8k0F8UMC2GJ210v4SyvMQd5Gmd1LP1dwacSNeBerGU58/5ACmfF3Xhnedjk5XC8dp0IB0jr3VJJGiRrKqwc39DwA1ihq39MuVNg6E1VOKKoy/tozqdBzzk=';
global.basePath = 'https://api.wanwantech.cn:18443/';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
