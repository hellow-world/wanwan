<template>
<div id="game">
  <div id="worldGame">
    <div id="group" class="gameList">
      <div class="gameTitle group" :class="{'off':isTitleOff}">
        <div class="title" @click="titleClick">小组赛 {{curMonth}}月{{curDay}}日<i class="icon-arrow"></i></div>
        <div class="gameDate">
          <ul>
            <li @click="dateClick(day,$index)" v-for="(day,$index) in groupDate" :class="{'dayActive':$index == groupDateNum}">{{day}}</li>
          </ul>
        </div>
      </div>
      <group :groupInfo="groupGame" :groupDate="curDay" :groupIndex="groupDateNum"></group>
    </div>
    <div id="eight" class="gameList">
      <div class="gameTitle group" :class="{'off':isTitleOff}">
        <div class="title" @click="titleClick">1/8决赛 {{curMonth}}月{{curDay}}日<i class="icon-arrow"></i></div>
        <div class="gameDate">
          <ul>
            <li @click="dateClick(day,$index)" v-for="(day,$index) in groupDate" :class="{'dayActive':$index == groupDateNum}">{{day}}</li>
          </ul>
        </div>
      </div>
      <group :groupInfo="groupGame" :groupDate="curDay" :groupIndex="groupDateNum"></group>
    </div>
  </div>
</div>
</template>

<script>
  import Group from './game/game-group'
export default {
  name: 'game',
  data () {
    return {
      curNum:0,
      isTitleOff:false,//点击标题关
      isDateOn:false,//点击日期
      curMonth:6,//当前月份
      curDay:14,//当前日
      groupGame:[
        {date:14,games:[]},
        {date:15,games:[]},
        {date:16,games:[]},
        {date:17,games:[]},
        {date:18,games:[]},
        {date:19,games:[]},
        {date:20,games:[]},
        {date:21,games:[]},
        {date:22,games:[]},
        {date:23,games:[]},
        {date:24,games:[]},
        {date:25,games:[]},
        {date:26,games:[]},
        {date:27,games:[]},
        {date:28,games:[]},
        {date:29,games:[]}
      ],//存储小组赛事
      eighthGame:[],//存储八分之一决赛赛事
      forthGame:[],//存储四分之一
      halfGame:[],//3/4决赛
      finalGame:[],//决赛
      groupTeam:[],//存储赛事队伍
      groupDateNum:0,
      sameGroup:true,//同一天是否存在同一组赛事
      groupDate:[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],//小组赛赛程日期
      groupGameMock:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    }
  },
  components:
    {
      'group':Group
    },
  created:function()
    {
      this.getNowDate(),
      this.getGroupGame()

    },
  mounted:function()
  {
    this.dateSet()
  },
  filters:
    {
      onlyDay:function(val)
      {
        return val.substring(8,11)
      }
    },
  methods:
    {
      //默认时间激活
      dateSet:function()
      {
        this.groupDateNum = this.groupDate.indexOf(this.curDay)
      },
      //时间框的收缩
      titleClick:function () {
        this.isTitleOff = !this.isTitleOff;
      },
      //时间选择点击
      dateClick:function(day,index)
      {
        this.curDay = day;
        this.groupDateNum = index;
        console.log(this.groupDateNum)
      },
      //获取当前时间并处理未到开赛时间
      getNowDate:function()
      {
        let _this = this;
        var date = new Date()
        let month= date.getMonth();
        let day  = date.getDate();
        console.log(day)
        if(month+1<6)
        {
          _this.curMonth = 6;
            _this.curDay   = 14;
        }
        else
          {
            _this.curMonth = month+1;
            if(day<14)
            {
              _this.curDay   = 14;
            }
            else
              {
                _this.curDay   = day;
              }

          }
      },
      //只保留 日
      onlyDay:val=>
      {
        return parseInt(val.substring(8,11))
      },
      //获取小组赛信息
      getGroupGame:function () {
        let _this = this;
        this.$http.get('./static/data/allGame.json')
          .then((res)=>{
            let list = res.data.result;
            let groupTemp = this.groupGame;
            for(var i = 0;i < groupTemp.length;i++)
            {
              for(var j = 0;j < list.length;j++)
              {
                let g = groupTemp[i].date;
                let l = _this.onlyDay(list[j].gameStartTime)
                if(g == l)
                {
                  this.groupGame[i].games.push(list[j])
                }
              }
            }
            console.log(this.groupGame)
          })
          .catch((error)=>{console.log(error)})
      }
    }
}
</script>

<style lang='less' scoped>
  @mainColor:#8fc31f;
  @maingrey:#4a4a4a;
#game
{
  padding-top:0.4rem;
  #worldGame
  {
    .gameList
    {
      width: 100%;
      margin: auto;
      margin-bottom: 0.4rem;
      .gameTitle
      {
        width: 6.38rem;
        margin: auto;
        height: auto;
        overflow: hidden;
        background-color: #fff;
        border-radius: 0.2rem;
        padding-bottom: 0.32rem;
        box-shadow: 0 0.05rem 0.2rem 0 rgba(0,0,0,0.1);
        transition: width .2s,padding-bottom .2s;
        &.off
        {
          padding-bottom: 0;
          width: 2.58rem;
          .title
          {
            .icon-arrow
            {
              transform: rotate(0deg);
            }
          }
          .gameDate
          {

            height: 0rem;
            opacity: 0;
          }
        }
        .title
        {
          box-sizing: border-box;
          width: 2.58rem;
          margin:auto;
          font-size: 0.26rem;
          background-color: #fff;
          padding-left: 0.24rem;
          height: 0.53rem;
          line-height: 0.53rem;
          border-radius: 0.265rem;
          position: relative;
          .icon-arrow
          {
            display: inline-block;
            width: 0.26rem;
            height: 0.26rem;
            background: url("../../../assets/images/icons/icon_arrow@2x.png") no-repeat center;
            background-size: contain;
            position: relative;
            top: 0.05rem;
            left: 0.05rem;
            transform: rotate(180deg);
            transition: transform .3s;
          }
        }
        .gameDate
        {
          box-sizing: border-box;
          padding-left: 0.18rem;
          padding-right: 0.18rem;
          height: 2.22rem;
          overflow: hidden;
          transition: height .2s,opacity .1s .2s;
          ul
          {
            li
            {
              font-size: 0.24rem;
              width: 0.5rem;
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: center;
              float: left;
              border-radius: 0.25rem;
              background-color: rgba(248,246,247,1);
              margin-right: 0.42rem;
              margin-top: 0.24rem;
              transition: background-color .2s,color .2s;
              &.dayActive
              {
                background-color: #8fc31f;
                color: #fff;
              }
              &:nth-child(7n)
              {
                margin-right: 0;
              }
            }
          }
        }
      }
    }

  }
}
</style>
