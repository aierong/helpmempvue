<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    me
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as constant from '@/common/constant.js'

  export default {
    name : "me" ,
    //数据模型
    data () {
      return {
        msg : ''
      }
    } ,
    //方法
    methods : {
      //退出系统，清除本地存储
      ExitSystem () {
        wx.removeStorageSync( constant.StorageName )

        //分发 action 修改状态
        this.$store.dispatch( 'SetupUser' , null )

        //转向 登录页面
        const url = "../index/main"
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

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./me.css">

</style>
