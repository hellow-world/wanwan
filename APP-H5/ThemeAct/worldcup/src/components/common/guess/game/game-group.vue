<template>
  <div id="gameContent">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(game,index) in groupInfo" :key="index">
        <div class="slideBox">
          <ul>
            <li v-for="(teamGame,$index) in game.games" class="groupGame-li">
              <div class="head">
                <span class="time fl">{{teamGame.gameStartTime|timeFormat}}</span>
                <span class="groupName fl">{{teamGame.gameName}}</span>
                <span class="gameResult fr">结果：{{teamGame.wonTeamId|wonNull}}</span>
              </div>
              <div class="content">
                <div class="leftTeam team" @click="guessTeam(teamGame.leftTeam,teamGame.leftTeamId,teamGame.gameType,teamGame.id)">
                  <div class="leftFlag flag">
                    <img :src="setFlag(teamGame.leftTeamId)" alt="">
                  </div>
                  <span class="leftTeamName">{{teamGame.leftTeam}} 胜</span>
                </div>
                <div class="draw" @click="guessTeam('平',-1,teamGame.gameType,teamGame.id)"><span>VS</span><span>平</span></div>
                <div class="rightTeam team" @click="guessTeam(teamGame.rightTeam,teamGame.rightTeamId,teamGame.gameType,teamGame.id)">
                  <div class="rightFlag flag">
                    <img :src="setFlag(teamGame.rightTeamId)" alt="">
                  </div>
                  <span class="rightTeamName">{{teamGame.rightTeam}} 胜</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </swiper>
    <transition name="fade">
      <modal v-show="isModal" :teamId="modalTeamId" :teamName="modalTeamName" :gameId="modalGameId" :gameType="modalGameType"></modal>
    </transition>
  </div>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import modal from '../../Modal'
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
        },
        flags:[],
        isModal:false,
        modalTeamName:'',
        modalTeamId:1,
        modalGameType:10001,
        modalGameId:1
      }
    },
    components:
      {
        swiper,
        swiperSlide,
        'modal':modal
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
      this.getFlags()
    },
    mounted:function(){

    },
    filters:
      {
        timeFormat:function(val)
        {
          //2018-03-04 13:00:00
          return val.substring(11,16)
        },
        wonNull:function(val)
        {
          if(val == -1)
          {
            return '平'
          }

        }
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
        getFlags:function()
        {
          let _this = this;
          this.$http.get('./static/data/flags.json')
            .then((res)=>
            {
              _this.flags = res.data.result;
            })
        },
        setFlag:function(val)
        {
          for(var i =0;i<this.flags.length;i++)
          {
            if(val == this.flags[i].id)
            {
              return this.flags[i].imgUrl;
            }
          }
        },
        //控制弹框
        guessTeam:function(name,teamid,gametype,gameid)
        {
          this.modalTeamName = name;
          this.modalTeamId = teamid;
          this.modalGameType = gametype;
          this.modalGameId = gameid;
          this.isModal = true;
        }
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
          padding: .24rem .16rem .24rem .16rem;
          box-sizing: border-box;
          .groupGame-li
          {
            display: block;
            height: auto;
            overflow: hidden;
            margin-bottom: .24rem;
            &:last-child
            {
              margin-bottom: 0rem;
            }
            .head
            {
              height: 0.42rem;
              position: relative;
              .time
              {
                font-size: .3rem;
                display: block;
                padding-left: 0.14rem;
                position: relative;
                height: 0.27rem;
                line-height: 0.27rem;
                &:before
                {
                  width: 0.06rem;
                  height: 0.27rem;
                  border-radius: 0.03rem;
                  background: rgba(143,195,31,1);
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 0rem;
                }
              }
              .groupName
              {
                font-size: .3rem;
                position: absolute;

                left: 2.77rem;
                top: -0.07rem;
              }
              .gameResult
              {
                font-size: 0.24rem;
                color: #4a4a4a;
              }
            }
            .content
            {
              .team
              {
                box-sizing: border-box;
                font-size: .26rem;
                width: 2.10rem;
                border: 0.01rem solid #ccc;
                border-radius: 0.1rem;
                height: .95rem;
                float: left;
                text-align: center;
                margin-left: 0.08rem;
                color: #4a4a4a;
                padding-top: 0.14rem;
                .flag
                {
                  width: 0.46rem;
                  height:0.3rem;
                  margin: auto;
                  margin-bottom: 0.04rem;
                  img
                  {
                    display: block;
                  }
                }
                &:first-child
                {
                  margin-left: 0rem;
                }
              }
              .draw
              {
                box-sizing: border-box;
                font-size: .26rem;
                width: 1.7rem;
                border: 0.01rem solid #ccc;
                border-radius: 0.1rem;
                height: .95rem;
                float: left;
                text-align: center;
                margin-left: 0.08rem;
                color: #4a4a4a;
                padding-top: 0.1rem;
                span
                {
                  display: block;
                }
              }
            }
          }

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
  .fade-enter-active
  {
    opacity: 0;
    transition: all .3s;
  }
  .fade-enter-to
  {
    opacity: 1;
  }
  .fade-leave-active
  {
    opacity: 1;
    transition: all .3s;
  }
  .fade-leave-to
  {
    opacity: 0;
  }
</style>
