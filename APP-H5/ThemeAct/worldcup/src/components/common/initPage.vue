<template>
<div id="initPage">
  <div class="football">
    <div class="ball" @click="removePage"></div>
    <div class="shadow"></div>
  </div>
<div class="btn">
  <div class="arrow">
    <span class="a1"></span>
    <span class="a2"></span>
    <span class="a3"></span>
  </div>
  <div class="button"></div>
</div>
</div>
</template>

<script>
export default {
  name: 'initPage',
  data () {
    return {

    }
  },
  methods:
    {
      removePage:function () {
        this.$parent.isInit = true;
      }
    }
}
</script>

<style lang='less' scoped>
#initPage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:url("../../assets/images/initPage/bg.jpg") no-repeat;
  background-size: cover;
position: absolute;
  z-index: 999;
  .btn
  {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 1rem;
    .arrow
    {
      width: 100%;
      margin-bottom: .15rem;
      span
      {
        mix-blend-mode: overlay;
        display: block;
        background: url("../../assets/images/initPage/arrow.png") no-repeat;
        background-size: cover;
        position: relative;
        &.a3
        {
          width: 1.52rem;
          height: .22rem;
          left: 2.96rem;
          animation: spark 1s infinite;
          animation-delay: .3s;
        }
        &.a2
        {
          width: 1.22rem;
          height: .17rem;
          left: 3.11rem;
          bottom: 0.02rem;
          animation: spark 1s infinite;
          animation-delay: .6s;
        }
        &.a1
        {
          width: 1rem;
          height: .12rem;
          left: 3.22rem;
          bottom: 0.03rem;
          animation: spark 1s infinite;
          animation-delay: .9s;
        }
      }
    }
    .button
    {
      width: 3.67rem;
      height: .66rem;
      position: relative;
      left: 1.84rem;
      background: url("../../assets/images/initPage/btn.png") no-repeat;
      background-size: cover;
      mix-blend-mode: overlay;
    }
  }
  .football
  {
    position: absolute;
    width: 100%;
    bottom: 2.85rem;
    .ball
    {
      width: 3.25rem;
      height: 3.34rem;
      margin: auto;
      background: url("../../assets/images/initPage/ball.png")no-repeat;
      background-size: cover;
      animation: upDown 1s .4s infinite,ballscale .5s;
      position: relative;
    }
    .shadow
    {
      width: 5.51rem;
      height: .61rem;
      margin: auto;
      background: url("../../assets/images/initPage/ballshadow-black.png") no-repeat;
      background-size: cover;
      animation: shadowScale 1s .4s infinite;
    }
  }
}
@keyframes upDown {
  0%{top:0rem};
50%{top: -0.2rem};
100%{
  top:0rem
;}
}
@keyframes ballscale {
  0%{transform:scale(0.1,0.1)};
100%{
  transform:scale(1,1)
;}
}
@keyframes shadowScale {
  0%{transform: scaleX(1)};
50%{
  transform: scaleX(.8)
;}
100%{transform: scaleX(1)}
}
@keyframes spark {
    from{opacity: 1}
    to{opacity: 0}
  }

</style>
