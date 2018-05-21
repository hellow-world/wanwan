<template>
  <div id="ranking">
    <table id="rankTable">
      <thead>
        <tr>
          <th>名次</th>
          <th>用户昵称</th>
          <th>参与时间</th>
          <th>积分</th>
        </tr>
      </thead>
      <transition-group tag="tbody" name="slide-fade">
        <tr v-for="(rankSingle,$index) in rankList" :key="$index">
          <td class="rankNum">{{$index+1}}</td>
          <td class="rankAvator">
            <div class="avatorImg">
              <img :src="rankSingle.avatar" alt="">
            </div>
          </td>
          <td class="rankName">{{rankSingle.nickName|nameLimited(5)}}</td>
          <td class="rankTime">{{rankSingle.joinTime|dateFormat}}</td>
          <td class="rankPoints">{{rankSingle.bonusPoint}}</td>
        </tr>

      </transition-group>
      <tfoot>
      <tr class="self">
        <td class="rankNum">{{selfIndex}}</td>
        <td class="rankAvator">
          <div class="avatorImg">
            <img :src="selfData.avatar" alt="">
          </div>
        </td>
        <td class="rankName">我</td>
        <td class="rankTime" v-show="selfPost">{{selfData.joinTime|dateFormat}}</td>
        <td class="rankTime" v-show="!selfPost">未参与</td>
        <td class="rankPoints">{{selfData.bonusPoint}}</td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ranking',
  data() {
    return {
      rankList:[],//排行榜数据
      selfData:{},//个人数据
      selfIndex:'1',//个人排名
      selfPost:true//个人是否参与
    }
  },
  created:function()
  {
    this.rankSel(),
    this.selfCalc()
  },
  methods:
    {
      rankSel:function()
      {
        var _this = this;
        this.$http.get('https://api.wanwantech.cn:18443/api-theme/v1.0/worldcup/bonus/sort',{headers:{'token':usertoken}})
          .then((res)=>{
            console.log(res)
          _this.rankList = res.data.result;
            if(res.data.msg!=null)
            {
              _this.selfPost = true;
              let str = eval("("+res.data.msg+")")
              _this.selfData = str;
            }
            else
              {
                _this.selfPost = false;
              }


        }).catch((error)=>{console.log(error)})

      },
      selfCalc:function()
      {
        if(this.selfPost)
        {
          for(var i=0;i<this.rankList.length;i++)
          {
            if(selfData.uid == this.rankList[i].uid)
            {
              this.selfIndex = i+1;
              return
            }
            else
            {
              this.selfIndex='未上榜';
            }
          }
        }

      }
    },
  filters:
    {
      nameLimited:(val,limitNum)=>
      {
        if(val.length>limitNum)
        {
          let name = val.substring(0,limitNum)
          return name+'··'
        }
        else
        {
          return val;
        }
      }
    }
}

</script>
<style lang='less' scoped>
#ranking {
  padding-top: 0.07rem;
  #rankTable {
    width: 100%;
    overflow: hidden;
    letter-spacing: 0;
    thead {
      display: block;
      width: 100%;
      height: 0.58rem;
      font-size: 0.24rem;
      background-color: #fff;
      font-weight: normal;
      tr {
        line-height: 0.58rem;
        color: #4a4a4a;
        position: relative;
        th {

          text-align: center;
          font-weight: normal;
          padding: 0px;
          &:nth-child(1) {

            text-align: left;
            width: 1.86rem;
            padding-left: 0.36rem;
          }
          &:nth-child(2) {

            width: 1.4rem;
          }
          &:nth-child(3) {

            width: 1.48rem;
            position: relative;
            padding-left: 0.57rem;
          }
          &:nth-child(4) {

            position: relative;
            left: 0.64rem;
          }
        }
      }

    }
    tbody {
      width: 100%;
      display: block;
      margin-top: 0.05rem;
      background-color: #fff;
      padding-bottom: 0.64rem;
      tr {
        display: block;
        width: 100%;
        height: 1.04rem;
        overflow: hidden;
        line-height: 1.04rem;

        padding-right: 0.69rem;
        td {
          font-weight: normal;
          color: #4A4A4A;
          lin-height: 1.04rem;
          &.rankNum {

            font-size: 0.32rem;
            width: 0.66rem;
            text-align: right;
          }
          &.rankAvator {
            width: 0.64rem;
            height: 0.64rem;
            padding-left: 0.48rem;
            .avatorImg {
              width: 0.64rem;
              height: 0.64rem;
              border-radius: 0.32rem;
              overflow: hidden;
              border: 0.02rem solid #8fc31f;
              img {
                width: 100%;
                display: block;
              }
            }
          }
          &.rankName {
            width: 2rem;
            font-size: 0.28rem;
            padding-left: 0.44rem;
            text-align: left;
          }
          &.rankTime {
            width: 2.22rem;
            font-size: 0.22rem;
          }
          &.rankPoints {
            font-size: 0.22rem;
            color: #8fc31f;
            text-align: right;

          }
        }
      }
    }
    tfoot {
      width: 100%;
      display: block;
      margin-top: 0.05rem;
      background-color: #fff;
      height: 0.64rem;
      line-height: 0.64rem;
      position: fixed;
      bottom: 0;
      border: 1px solid #979797;
      tr {
        width: 100%;
        height: 0.64rem;
        overflow: hidden;
        line-height: 0.64rem;
        td {

          text-align: center;
          font-weight: normal;
          height: 0.64rem;
          color: #4A4A4A;
          lin-height: 0.64rem;
          &.rankNum {
            width: 1.12rem;
            font-size: 0.24rem;
          }
          &.rankAvator {
            width: 0.64rem;
            height: 0.64rem;

            .avatorImg {
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 0.22rem;
              overflow: hidden;
              border: 0.01rem solid #8fc31f;
              margin: auto;
              img {
                width: 100%;
                display: block;
              }
            }
          }
          &.rankName {
            width: 2.01rem;
            font-size: 0.28rem;
            padding-left: 0.48rem;
            text-align: left;
          }
          &.rankTime {
            width: 1.48rem;
            font-size: 0.22rem;
          }
          &.rankPoints {


            font-size: 0.22rem;
            color: #8fc31f;
            text-align: right;
            width: 0.98rem;
          }
        }
      }
    }
  }
}

.slide-fade-enter
{
  opacity: 0;
}
.slide-fade-enter-active
{
  transition: all .3s;
}
//小屏分辨率适配 iphone5等
@media all and (max-width: 640px)
{
  #ranking
  {
    #rankTable
    {
      thead
      {

      }
    }
  }

}
</style>
