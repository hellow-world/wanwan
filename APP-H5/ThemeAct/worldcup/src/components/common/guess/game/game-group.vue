<template>
  <!--<div id="gameContent">-->
    <!--<div class="leftGoupMode mode fl" v-show="isShow"></div>-->
    <!--<v-touch tag="div" v-on:swipeleft="onLeft" class="gameGroupList fl mode">-->
      <!--<ul>-->
        <!--<li class="gameContentList" v-for="game in gameList">-->
          <!--<div class="contentTitle">-->
            <!--<span class="time fl">{{game.gameTime}}</span>-->
            <!--<span class="groupName fl">{{game.group}}组</span>-->
            <!--<span class="gameResult fr">结果:俄罗斯 胜</span>-->
          <!--</div>-->
          <!--<div class="contentTeam">-->
            <!--<ul>-->
              <!--<li class="leftTeam success">-->
                <!--<div class="teamFlag"><img src="../../../../assets/images/teams/Russian@2x.png" alt=""></div>-->
                <!--<span class="teamName">{{game.leftName}} 胜</span>-->
              <!--</li>-->
              <!--<li class="middle">-->
                <!--<span>VS</span>-->
                <!--<span class="teamName">平</span>-->
              <!--</li>-->
              <!--<li class="rightTeam guessed">-->
                <!--<div class="teamFlag"><img src="../../../../assets/images/teams/Russian@2x.png" alt=""></div>-->
                <!--<span class="teamName">{{game.rightName}} 胜</span>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</v-touch>-->
    <!--<div class="rightGoupMode mode fl" :class="{active:isActive}" v-show="isShow"></div>-->
  <!--</div>-->
  <div id="gameContent">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide><div class="slideBox">{{groupIndex}}</div></swiper-slide>
      <swiper-slide><div class="slideBox">{{groupIndex+1}}</div></swiper-slide>
      <swiper-slide><div class="slideBox">{{groupIndex+2}}</div></swiper-slide>
      <swiper-slide><div class="slideBox">{{groupIndex+3}}</div></swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  export default {
    name: 'game-group',
    data() {
      return {
        swiperOption:{
          debugger: true,
          centeredSlides:true
        }
      }
    },
    components:
      {
        swiper,
        swiperSlide
      },
    props:['groupInfo','groupDate','groupIndex'],
    mounted:function(){

    },
    watch:
      {
        groupIndex(val)
        {
          this.groupIndex = val;
        }
      },
    methods:
      {

      }
  }
</script>

<style lang="less" scoped>
  @mainColor:#8fc31f;
  @maingrey:#4a4a4a;
  #gameContent
  {
    width: 100%;
    margin-top: .4rem;
    height: 7.08rem;
    .swiper-container
    {
      width: 100%;
      margin: auto;
      overflow: visible;
      .swiper-slide
      {
        .slideBox
        {
          width: 6.32rem;
          margin: auto;
          height: 6.3rem;
          background-color: #fff;
          box-shadow: 0 0.05rem .2rem 0rem rgba(0,0,0,0.2);
          border-radius: .2rem;
          position: relative;
          top: .39rem;
          transition: all .3s;

        }

      }
      .swiper-slide-active
      {
        .slideBox
        {
          width: 6.32rem;
          margin: auto;
          height: 7.08rem;
          background-color: #fff;
          box-shadow: 0 0.05rem .2rem 0rem rgba(0,0,0,0.2);
          border-radius: .2rem;
          position: relative;
          top: 0;

        }
      }
    }

  }
</style>
