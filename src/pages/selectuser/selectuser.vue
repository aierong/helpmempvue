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

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  export default {
    name : "selectuser" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    //数据模型
    data () {
      return {
        userlist : []
      }
    } ,
    //方法
    methods : {
      getuserlist () {
        userapi.getuserlist().then( ( res ) => {

        } )
      } ,

    } ,
    //计算属性
    computed : {
      // getuserid () {
      //   return this.$store.getters.getuserid;
      // } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'selectuser mouted' )

      console.log( this.getloginuserid )
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
