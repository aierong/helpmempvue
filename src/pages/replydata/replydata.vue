<!--
作者:chenghao
Date: 2019/4/27
Time: 22:55
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    replydata
    <detaildata :userselectproductdetaildata="userselectproductdetaildata"
                :stepdata="stepdata"
                :activesteps="activesteps"></detaildata>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import detaildata from '@/components/detaildata/index.vue'
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'

  export default {
    name : "replydata" ,
    components : {
      detaildata
    } ,
    //数据模型
    data () {
      return {
        userselectproductno : 'CJ424205635' ,
        userselectproductdetaildata : null ,

        activesteps : 0 ,
        stepdata : [] ,
      }
    } ,
    //方法
    methods : {
      /**
       * 得时光轴数据
       */
      getstepdata () {
        dllogapi.getloglistbyproductno( this.userselectproductno ).then( ( res ) => {
          // console.log( 'res' , res )

          this.stepdata = []
          this.activesteps = 0;

          if ( res != null && res.length > 0 ) {
            for ( let item of res ) {
              let _desc = '操作:' + utils.getlogruntypedesc( item.logruntype ) + '  交期/复期:' + item.dates;

              let obj = {
                text : item.createdAt + '(' + item.username + ')' ,
                desc : _desc
              }

              //把数据加入
              this.stepdata.push( obj );
            }

            this.activesteps = res.length;
          }

        } )
      } ,
      getdetaildata () {
        dlapi.getproductbyproductno( this.userselectproductno ).then( ( res ) => {
          console.log( 'res' , res )

          if ( res != null ) {
            this.userselectproductdetaildata = res;
          }
          else {
            this.userselectproductdetaildata = null;
          }

        } )
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
      console.log( 'replydata mouted' )

      //取到前一个页面传递过来的工程单号
      // this.userselectproductno = this.$mp.query.productno
      console.log( 'userselectproductno' , this.userselectproductno )
      this.getstepdata();
      this.getdetaildata();
    } ,
    onLoad () {
      console.log( 'replydata onLoad' )
    } ,
    onShow () {

      console.log( 'replydata onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./replydata.css">
</style>
