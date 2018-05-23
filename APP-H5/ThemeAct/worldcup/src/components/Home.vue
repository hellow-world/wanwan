<template>
  <div id="home">
    <!--启动页-->
  <transition name="slide">
    <initPage v-if="!isInitExit" :isshow="createInit"></initPage>
  </transition>
    <transition name="slide-right">
    <rule v-show="isrule"></rule>
    </transition>
    <!--内容-->
  <div class="content" v-if="isInitExit">
  <header>
    <span>{{title}}</span>
    <button @click="onRule" class="ruleButton">{{ruleText}}</button>
  </header>
    <navbar></navbar>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './common/NavBar'
import initPage from './common/initPage'
import rule from './common/rule'
export default {

  name: 'Home',
  data () {
    return {
      title: '世界杯竞猜',
      ruleText:'规则',
      isInitExit:true,//启动页是否退出
      isrule:false,
      createInit:true//启动页是否创建 0创建 1不创建

    }
  },
  created:function()
  {
    this.getGames()
  },
  components:
  {
    'navbar':NavBar,
    'initPage':initPage,
    'rule':rule
  },
  methods:
    {
      getGames:function()
      {
        let _this = this;
        this.$http.get(basePath+'api-theme/v1.0/worldcup/game/list/all',{headers:{token:usertoken}})
          .then((res)=>{

            console.log(res);
            let isInitNum = parseInt(res.data.msg);
            if(isInitNum==1)
            {
              _this.createInit = false;
              _this.isInitExit = true;

            }
            else if(isInitNum==0)
            {
              _this.createInit = true;
              _this.isInitExit = false;

            }
          })
          .catch((error)=>{console.log(error)})

      },
      onRule:function()
      {
        this.isrule = true;
      }
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
  position: relative;
  span
  {
    display:inline-block;
    width:100%;
    text-align:center;
    font-size:0.36rem;
    color :#fff;
    position: absolute;
    top: .59rem;
  }
  .ruleButton
  {
    font-size: .3rem;
    background: none;
    color: #fff;
    position: absolute;
    right: 0.22rem;
    top: 0.63rem;
    font-weight: normal;
    outline:none;
  }
}
  .slide-leave-active
  {
    transition: all .3s ease;
  }
  .slide-leave-to
  {
    opacity: 0;
    transform: translateX(-7.5rem);
  }
.slide-right-enter-active
{
  transition: all .3s ease;
  transform: translateX(7.5rem);
}
.slide-right-leave-active
{
  transition: all .3s ease;
}
.slide-right-enter-to
{
  transform: translateX(0rem);

}
.slide-right-leave-to
{
  transform: translateX(7.5rem);
}
</style>
