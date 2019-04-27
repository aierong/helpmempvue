<!--
作者:chenghao
Date: 2019/4/27
Time: 21:32
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
<!--    <van-button size="large" type="warning" plain -->
    <!--                @click="dj"-->
    <!--    >返回123-->
    <!--    </van-button>-->

    <!--    <button>1putong</button>-->
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  export default {
    name : "index" ,
    //数据模型
    data () {
      return {
        msg : ''
      }
    } ,
    //方法
    methods : {
      dj () {
        //代码搞这里
        console.log( 'dj' )
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
       src="./index.css">
</style>
