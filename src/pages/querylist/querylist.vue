<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    query
  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  export default {
    name : "querylist" ,

    //数据模型
    data () {
      return {
        msg : ''
      }
    } ,
    //方法
    methods : {
      // dj () {
      //   //代码搞这里
      //   const url = "../replydata/main"
      //   wx.navigateTo( { url : url } )
      // } ,

    } ,
    //计算属性
    computed : {
      userselectquerytype () {
        return this.$store.state.userselectquerytype;

      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'querylist mouted' )
    } ,
    onLoad () {
      console.log( 'querylist onLoad' )
    } ,
    onShow () {

      console.log( 'querylist onShow' );
    } ,
    onHide () {
      console.log( 'querylist onHide' );
    } ,
    onUnload () {
      console.log( 'querylist onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./querylist.css">
</style>
