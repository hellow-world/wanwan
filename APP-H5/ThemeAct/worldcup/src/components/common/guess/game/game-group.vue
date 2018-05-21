<template>
  <div id="gameContent">
    <div class="leftGoupMode mode fl" v-show="isShow"></div>
    <v-touch tag="div" v-on:swipeleft="onLeft" class="gameGroupList fl mode">
      <ul>
        <li class="gameContentList" v-for="game in gameList">
          <div class="contentTitle">
            <span class="time fl">{{game.gameTime}}</span>
            <span class="groupName fl">{{game.group}}组</span>
            <span class="gameResult fr">结果:俄罗斯 胜</span>
          </div>
          <div class="contentTeam">
            <ul>
              <li class="leftTeam success">
                <div class="teamFlag"><img src="../../../../assets/images/teams/Russian@2x.png" alt=""></div>
                <span class="teamName">{{game.leftName}} 胜</span>
              </li>
              <li class="middle">
                <span>VS</span>
                <span class="teamName">平</span>
              </li>
              <li class="rightTeam guessed">
                <div class="teamFlag"><img src="../../../../assets/images/teams/Russian@2x.png" alt=""></div>
                <span class="teamName">{{game.rightName}} 胜</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </v-touch>
    <div class="rightGoupMode mode fl" :class="{active:isActive}" v-show="isShow"></div>
  </div>
</template>

<script>
  export default {
    name: 'game-group',
    data() {
      return {
        gameDay:1,
        gameList:[],
        flagList:[],
        isActive:false,
        isShow:false
      }
    },
    props:['groupInfo','groupDate','groupIndex'],
    mounted:function(){
      this.getParam(),
      this.groupFilter()
      // this.getFlag()
    },
    watch:
      {
        groupIndex(val)
        {
          this.groupIndex = val;
          this.groupFilter();
        }
      },
    methods:
      {
        getParam:function()
        {
          console.log(this.groupDate);
        },
        getFlag:function()
        {
          let _this = this;
          this.$http.get('./static/data/flags.json')
            .then((res)=>{_this.flagList = res.data.result;})
            .catch((error)=>{console.log(error)})
          console.log(_this.flagList)
        },
        groupFilter:function()
        {
          let list = this.groupInfo;
          console.log(list);
          this.gameList = list[this.groupIndex];
          console.log(this.gameList)
        },
        onLeft:function()
        {
          console.log('left')
          this.isActive = true;
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
    margin-top: 0.4rem;
    position: relative;
    min-height: 6.3rem;
    .leftGoupMode
    {
      width: 6.3rem;
      height: 6.3rem;
      background-color: #fff;
      border-radius: 0.2rem;
      box-shadow: 0 0.05rem 0.2rem 0 rgba(0,0,0,0.2);
      position: absolute;
      left: -6.52rem;
      top: .39rem;
      transition: all 5s;
    }
    .rightGoupMode
    {
      width: 6.3rem;
      height: 6.3rem;
      background-color: #fff;
      border-radius: 0.2rem;
      box-shadow: 0 0.05rem 0.2rem 0 rgba(0,0,0,0.2);
      position: absolute;
      right: -6.52rem;
      top: .39rem;
      transition: all 1s;
    }
    .gameGroupList{
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      z-index: 99;
      background-color: #fff;
      border-radius: 0.2rem;
      box-shadow: 0 0.05rem 0.2rem 0 rgba(0,0,0,0.2);
      padding: 0.31rem 0.16rem 0.24rem 0.16rem;
      .gameContentList
      {
        height: auto;
        overflow: hidden;
        margin-bottom: 0.24rem;
        &:last-child
        {
          margin-bottom: 0px;
        }
      }
      .contentTitle
      {
        height: auto;
        overflow: hidden;
        .time
        {
          display: block;
          width: 0.8rem;
          padding-left: 0.14rem;
          font-size: 0.3rem;
          position: relative;
          &:before
          {
            content: "";
            width: 0.06rem;
            height: 0.27rem;
            background-color: @mainColor;
            position: absolute;
            left: 0;
            border-radius: 0.03rem;
            top: .07rem;
          }
        }
        .groupName
        {
          margin-left: 1.83rem;
          font-size: .3rem;
          line-height: 0.35rem;
        }
        .gameResult
        {
          font-size: .24rem;
          color: @maingrey;
        }
      }
      .contentTeam
      {
        margin-top: .15rem;
        ul
        {
          li
          {
            float: left;
            font-size: 0.26rem;
            padding-top: .14rem;
            padding-bottom: .1rem;
            box-sizing: border-box;
            border: 0.01rem solid #ccc;
            border-radius: 0.1rem;
            text-align: center;
            margin-left: 0.08rem;
            position: relative;
            &.success
            {
              border-color: #DC0012;
              color: #DC0012;
              background-color: rgba(251,235,236,1);
            }
            &.guessed
            {
              border-color: @mainColor;
              &:after
              {
                width: .36rem;
                height:.36rem;
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                background: url("../../../../assets/images/icons/guess_icon_bet@2x.png") no-repeat;
                background-size: cover;
              }
            }
            .teamFlag
            {
              width: .46rem;
              height: .3rem;
              margin: auto;
              img
              {
                display: block;
                width: 100%;
              }
            }
            &:first-child
            {
              margin-left: 0px;
            }
            &.leftTeam
            {
              width: 2.1rem;

            }
            &.middle
            {
              width: 1.7rem;
              height: .95rem;
              span
              {
                display: block;
              }

            }
            &.rightTeam
            {
              width: 2.1rem;

            }
          }
        }
      }
    }

  }
</style>
