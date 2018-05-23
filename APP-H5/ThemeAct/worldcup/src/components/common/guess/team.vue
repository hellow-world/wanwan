<template>
<div id="team">
  <ul class="teamRow">
  	<li class="group-li" v-for = "group in groupList" :class="{active:isActive}">
  		<span class="groupTitle">{{group.group}}组</span>
  		<ul>
  			<li class="team-li" v-for = "team in group.teams">
          <div class="teamImg">
            <img :src="team.imgUrl" :alt="team.name">
          </div>
          <span class="teamTitle">{{team.name}}</span>
        </li>
  		</ul>
  	</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'team',
  data () {
    return {
      groupList:[],
      isActive:false
    }
  },
  created:function()
  {
    this.teamSel()
  },
  methods:
    {
      teamSel:function()
      {
        var _this = this;
        this.$http.get('./static/data/team.json')
          .then(function(res){
            let data = res.data;
            _this.groupList = data.result;
            setTimeout(function(){_this.isActive = true;},20)
          })
          .catch(function(error)
          {
            console.log(error)
          })
      }

    }
}
</script>

<style lang='less' scoped>
#team
{
	width:100%;
	height:auto;
	overflow:hidden;
  padding-top: 0.4rem;
	.teamRow
	{
    width: 100%;
		padding-top:0px;
		.group-li
    {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-bottom: 0.4rem;
      position: relative;
      top: 0.5rem;
      opacity: 0;
      transition: all .3s ease-out;
      &:nth-child(2)
      {
        transition-delay: .05s;
      }
      &:nth-child(3)
      {
        transition-delay: .1s;
      }
      &:nth-child(4)
      {
        transition-delay: .15s;
      }
      &:nth-child(5)
      {
        transition-delay: .2s;
      }
      &:nth-child(6)
      {
        transition-delay: .25s;
      }
      &:nth-child(7)
      {
        transition-delay: .3s;
      }
      &:nth-child(8)
      {
        transition-delay: .35s;
      }
      &.active
      {
        opacity: 1;
        top: 0rem;
      }
			.groupTitle
			{
				display:block;
				width:100%;
				text-align:center;
				font-size:0.36rem;
				font-weight:normal;
        margin-bottom: 0.17rem;

			}
			ul
				{
          position: relative;
          width:6.54rem;
          height: 0.9rem;
          margin: auto;
					.team-li
					{
						float:left;
						width:1.35rem;
						height:auto;
            overflow: hidden;
						margin-left:0.38rem;
						&:first-child
						{
							margin-left:0em;
						}
            .teamImg
            {
              width: 1.35rem;
              height: 0.9rem;
              border-radius:0.1rem;
              background-color:#ccc;
              background-image: url("../../../assets/images/icons/icon_unkown@2x.png");
              background-position: center;
              background-repeat: no-repeat;
              background-size: 0.4rem 0.4rem;
              overflow: hidden;
              img
              {
                width: 100%;
                display: block;
              }
            }
            .teamTitle
            {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 0.24rem;
              margin-top: 0.08rem;
            }

					}
				}
		}
	}
}

</style>
