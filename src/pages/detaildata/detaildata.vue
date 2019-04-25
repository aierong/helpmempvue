<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-collapse :value="activeNames"
                  @change="onActiveChange">
      <van-collapse-item title="单据基本属性"
                         name="1">
        提供多样店铺模板，快速搭建网上商城
      </van-collapse-item>

      <van-collapse-item title="时光轴"
                         name="2">
        <van-steps :steps="stepdata"
                   :active="activesteps"
                   direction="vertical"
                   active-color="#f44"/>
      </van-collapse-item>

    </van-collapse>

    <van-button size="large"
                @click="backpage">返回
    </van-button>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  export default {
    name : "detaildata" ,
    //数据模型
    data () {
      return {
        selectproductno : '' ,

        activeNames : [ "1" , "2" ] ,
        activesteps : 3 ,
        stepdata : [
          {
            text : '步骤一' ,
            desc : '描述信息'
          } ,
          {
            text : '步骤二' ,
            desc : '描述信息'
          } ,
          {
            text : '步骤三' ,
            desc : '描述信息'
          } ,
          {
            text : '步骤四' ,
            desc : '描述信息'
          }
        ] ,
      }
    } ,
    //方法
    methods : {
      backpage () {
        wx.navigateBack()

        // wx.switchTab( {
        //   url : "../helpmeadd/main"
        // } );
      } ,
      onActiveChange ( event ) {
        //由于 :value="activeNames" 不是双向数据绑定 这里我们要主动赋值一下
        this.activeNames = event.mp.detail;
      } ,

    } ,
    //计算属性
    computed : {
      //name() {
      //代码搞这里
      //return this.data;
      //}
    } ,
    //生命周期(mounted)
    mounted () {
      //取到前一个页面传递过来的工程单号
      this.selectproductno = this.$mp.query.productno

      console.log( 'detaildata mouted' )
    } ,
    onLoad () {
      console.log( 'detaildata onLoad' )
    } ,
    onShow () {

      console.log( 'detaildata onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./detaildata.css">
</style>
