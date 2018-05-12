<template>
  <div id="home">
  <header>
    <span>{{title}}</span>
  </header>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './common/NavBar'
export default {

  name: 'HelloWorld',
  data () {
    return {
      title: '世界杯竞猜'
    }
  },
  components:
  {
    'navbar':NavBar
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
</style>
