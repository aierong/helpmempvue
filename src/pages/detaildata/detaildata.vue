<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>

  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  export default {
    name : "detaildata" ,

    //数据模型
    data () {
      return {}
    } ,
    //方法
    methods : {} ,
    //计算属性
    computed : {
      //name() {
      // 代码搞这里
      //return this.data;
      //}
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'detaildata mounted' )
    } ,
    onLoad () {
      console.log( 'detaildata onLoad' )
    } ,
    onShow () {
      console.log( 'detaildata onShow' )
    } ,
    onHide () {
      console.log( 'detaildata onHide' );
    } ,
    onUnload () {
      console.log( 'detaildata onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./detaildata.css">
</style>
