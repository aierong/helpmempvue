<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <detaildata :userselectproductno="userselectproductno"></detaildata>

  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import detaildata from '@/components/detaildata/index.vue'
  import { mixmethods } from '@/mixin/commonmethods.js'

  export default {
    name : "detaildata" ,
    //导入混入对象 可以是多个,数组
    mixins : [

      mixmethods
    ] ,
    components : {
      detaildata

    } ,
    //数据模型
    data () {
      return {
        //CJ424205635
        userselectproductno : '' ,
      }
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

      this.userselectproductno = this.$mp.query.productno
    } ,
    onShow () {
      console.log( 'detaildata onShow' )

      // wx.setNavigationBarTitle( { title : this.userselectproductno + '复期操作' } )
      this.setuppagetitle( this.userselectproductno + '详情' )
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
