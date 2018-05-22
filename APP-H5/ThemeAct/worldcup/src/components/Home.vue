<template>
  <div id="home">
  <transition name="slide">
    <initPage v-if="!isInit"></initPage>
  </transition>
  <div class="content" v-if="isInit">
  <header>
    <span>{{title}}</span>
  </header>
    <navbar></navbar>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './common/NavBar'
import initPage from './common/initPage'
export default {

  name: 'Home',
  data () {
    return {
      title: '世界杯竞猜',
      isInit:false
    }
  },
  components:
  {
    'navbar':NavBar,
    'initPage':initPage
  }
}
</script>

<style lang='less' scoped>
header
{
  width:100%;
  height:3.48rem;
  background:url('../assets/banner@2x.png') no-repeat;
  background-size:cover;
  span
  {
    display:inline-block;
    width:100%;
    text-align:center;
    font-size:0.36rem;
    color :#fff;
  }
}
  .slide-leave-active
  {
    transition: all .3s ease;
  }
  .slide-leave-to
  {
    opacity: 0;
    transform: translateX(-7.5rem);
  }
</style>
