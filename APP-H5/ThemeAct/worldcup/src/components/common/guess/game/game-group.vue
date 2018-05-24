<template>
  <div id="gameContent">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(game,index) in groupInfo" :key="index">
        <div class="slideBox">
          {{game}}
          <ul>
            <li v-for="(teamGame,$index) in game.games">{{$index}}</li>
          </ul>
        </div>
      </swiper-slide>
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
          initialSlide:this.groupIndex,
          notNextTick: true,
          centeredSlides:true,
          slidesPerView:'auto',
          spaceBetween : '4%',
          on:
            {
              slideChange:()=>
              {
                this.$parent.groupDateNum = this.swiper.activeIndex;
              }
            }
        }

      }
    },
    components:
      {
        swiper,
        swiperSlide
      },
    props:['groupInfo','groupDate','groupIndex'],
    computed:
      {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },
    created:function()
    {
      console.log(this.groupInfo)
    },
    mounted:function(){
      console.log(this.groupInfo)
    },
    watch:
      {
        groupIndex(val)
        {
          this.groupIndex = val;
          this.swiper.slideTo(this.groupIndex);

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
          box-sizing: border-box;
          width: 6.38rem;
          margin: auto;
          height: 7.08rem;
          background-color: #fff;
          box-shadow: 0 0.05rem .2rem 0rem rgba(0,0,0,0.2);
          border-radius: .2rem;
          position: relative;
          top: 0;
          padding: .24rem .16rem .24rem .16rem;
        }
      }
    }

  }
</style>
