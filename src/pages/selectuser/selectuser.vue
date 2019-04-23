<!--
作者:chenghao
功能:vue页
-->

<!--
用户选择
 -->
<template>

  <div>
    selectuser
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as userapi from '@/common/BmobApi/users.js'

  export default {
    name : "selectuser" ,
    //数据模型
    data () {
      return {
        userlist : []
      }
    } ,
    //方法
    methods : {
      //methodsname() {
      //代码搞这里
      //},

    } ,
    //计算属性
    computed : {
      getuserid () {
        return this.$store.getters.getuserid;
      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'selectuser mouted' )

      console.log( this.getuserid )
    } ,
    onLoad () {
      console.log( 'selectuser onLoad' )
    } ,
    onShow () {

      console.log( 'selectuser onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./selectuser.css">

</style>
