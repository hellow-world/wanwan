<template>
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
          centeredSlides:true,
          slidesPerView:'auto',
          spaceBetween : '4.26666%',
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
        width: 6.38rem;
        height: 6.3rem;
        .slideBox
        {
          width: 6.38rem;
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
          width: 6.38rem;
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
