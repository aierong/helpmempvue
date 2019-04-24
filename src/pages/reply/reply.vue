<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    答复人家reply
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  import * as dlapi from '@/common/BmobApi/dl.js'

  export default {
    name : "reply" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    //数据模型
    data () {
      return {
        productlist : []
      }
    } ,
    //方法
    methods : {
      getproductlist () {
        //代码搞这里
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
      console.log( 'reply mouted' )

    } ,
    onLoad () {
      console.log( 'reply onLoad' )
    } ,
    onShow () {

      console.log( 'reply onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./reply.css">
</style>
