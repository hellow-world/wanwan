<template>
<div id="navBar">
  <div class="guessTitle">
    <ul>
      <router-link :to="{ path: '/game'}" tag='li' class='guess-li'>赛事竞猜</router-link>
      <router-link :to="{ path: '/ranking'}" exact tag='li' class='guess-li'>积分排名</router-link>
      <router-link :to="{ path: '/team'}" exact tag='li' class='guess-li'>参赛队伍</router-link>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
#navBar
{
  width:100%;
  height:0.8rem;
  background-color:#fff;
  box-shadow:0px 0.02rem 0.03rem 0px rgba(0,0,0,0.1);
  .guessTitle
  {
    width:100%;
    ul
    {
      width:100%;
      li.guess-li
      {
        width:33.33%;
        float:left;
        font-size:0.26rem;
        height:0.76rem;
        line-height:0.76rem;
        text-align:center;
      }
    }
  }
}
.router-link-active
{
  color:#417505;
  border-bottom:0.04rem solid #417505;
}
</style>
