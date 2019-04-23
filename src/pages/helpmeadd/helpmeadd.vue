<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <!--    <van-field :value="productno"-->
    <!--               label="工程单"-->
    <!--               required-->
    <!--               placeholder="请输入工程单"/>-->

    <!--
    disabled 禁止输入
    -->
    <van-field :value="productno"
               center
               clearable
               label="工程单"
               disabled
               placeholder="请选择工程单"
               use-button-slot>
      <van-button slot="button"
                  size="small"
                  type="primary"
                  @click="onselectproduct">选择
      </van-button>
    </van-field>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  export default {
    name : "helpmeadd" ,
    //数据模型
    data () {
      return {
        productno : ''
      }
    } ,
    //方法
    methods : {
      onselectproduct () {
        //代码搞这里
        //转向  产品选择页面
        const url = "../selectproduct/main"
        wx.navigateTo( { url : url } )
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
      console.log( 'helpmeadd mouted' )
    } ,
    onLoad () {
      console.log( 'helpmeadd onLoad' )
    } ,
    onShow () {

      console.log( 'helpmeadd onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./helpmeadd.css">
</style>
