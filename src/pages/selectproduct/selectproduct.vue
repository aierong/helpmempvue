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
  import * as dlapi from '@/common/BmobApi/dl.js'

  export default {
    name : "selectproduct" ,
    //数据模型
    data () {
      return {
        productlist : []
      }
    } ,
    //方法
    methods : {
      getproductlist () {
        let counts = 5;
        this.productlist = dlapi.getproductlist( counts )

        console.log( this.productlist )
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
      console.log( 'selectproduct mouted' )

      this.getproductlist();
    } ,
    onLoad () {
      console.log( 'selectproduct onLoad' )
    } ,
    onShow () {

      console.log( 'selectproduct onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style src="./selectproduct.css"
       scoped>

</style>
