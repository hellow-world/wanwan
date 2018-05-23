<template>
<div id="rule">
  <header>
    <a href="#" class="backBtn" @click="CloseRule"></a>
    <span>规则</span>
  </header>
  <div class="content">
    <p>sakohdioashdfoiashnfoiashdfioa</p>
    <p>sakohdioashdfoiashnfoiashdfioa</p>
    <p>sakohdioashdfoiashnfoiashdfioa</p>
    <p>sakohdioashdfoiashnfoiashdfioa</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'rule',
  data () {
    return {

    }
  },
  methods:
    {
      CloseRule:function()
      {
        this.$parent.isrule = false;
      }
    }
}
</script>

<style lang='less' scoped>
#rule
{
  width: 100%;
  height: 100%;
  background: rgba(247,247,247,1);
  position: absolute;
  overflow: hidden;
  top: 0;
  left:0;
  z-index: 999;
  header
  {
    width: 100%;
    height: 1.28rem;
    background-color: #fff;
    text-align: center;
    font-size: .36rem;
    color: #4a4a4a;
    line-height: 1.7rem;
    .backBtn
    {
      display: block;
      width: .38rem;
      height: .38rem;
      background: url("../../assets/images/icons/btn_back@2x.png");
      background-size: cover;
      position: absolute;
      left: .25rem;
      top: .65rem;

    }
  }
  .content
  {
    box-sizing: border-box;
    width: 100%;
    padding: .51rem .24rem .55rem .24rem;
    font-size: .32rem;
    color: #4a4a4a;
  }
}
</style>
