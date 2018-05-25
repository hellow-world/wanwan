<template>
  <div id="guessModal">
    <div class="modal-content">
      <span class="text">确认选择 {{teamName}}?</br>猜中可获得 <a href="#">{{repoint}}</a> 积分</span>
      <div class="Btn">
        <div class="btnSubmit" @click="guessPost">参加</div>
        <div class="btnCancel" @click="guessClose">取消</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      point:1
    }
  },
  props:['teamName','teamId','gameId','gameType'],
  computed:
    {
      repoint:function()
      {
        if(this.gameType==10001)
        {
          return 1;
        }
      }
    },
  methods:
    {
      guessPost:function()
      {
        this.$http.post( basePath+'api-theme/v1.0/worldcup/guess',{gameId:this.gameId,teamId:this.teamId})
          .then((res)=>{console.log(res)})
          .catch((error)=>{console.log(error)})
      },
      guessClose:function()
      {
        this.$parent.isModal = false;
      }
    }
}
</script>

<style lang='less' scoped>
  #guessModal
  {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    .modal-content
    {
      width: 80%;
      height: 7rem;
      margin: auto;
      background: #fff;
      border-radius: 0.2rem;
      overflow: hidden;
      background-color: #fff;
      background-image: url("../../assets/images/icons/signup_success_bg@2x.png");
      background-repeat: no-repeat;
      background-position: top;
      background-size: contain;
      position: relative;
      top: 23%;
      .text
      {
        display: block;
        width: 100%;
        position: absolute;
        top: 3.82rem;
        text-align: center;
        font-size: .36rem;
        color: #4a4a4a;
        box-sizing: border-box;
        padding: 0 0.4rem 0 0.4rem;
        line-height: 0.5rem;
        a
        {
          color: #8fc31f;
        }
      }
      .Btn
      {
        width: 100%;
        margin: auto;
        height: auto;
        overflow: hidden;
        font-size: 0.36rem;
        text-align: center;
        position: absolute;
        bottom: 0.4rem;
        .btnSubmit
        {
          margin: auto;
          width: 4rem;
          height: 0.72rem;
          background-color: #8fc31f;
          border-radius: 1rem;
          line-height: 0.72rem;
          color: #fff;
          margin-bottom: 0.24rem;
          transition: background-color .1s;
          &:active
          {
            background-color: rgba(143,195,31,0.8);
          }
        }
        .btnCancel
        {
          box-sizing: border-box;
          margin: auto;
          width: 4rem;
          height: 0.72rem;
          background-color: transparent;
          border-radius: 1rem;
          line-height: 0.72rem;
          color: #9b9b9b;
          border: 0.02rem solid #979797;
          border-radius: 1rem;
        }
      }

    }
  }
</style>
