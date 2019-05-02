<!--
作者:chenghao
Date: 2019/5/2
Time: 19:44
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    codeing...
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import * as dlapi from '@/common/BmobApi/dl.js'

  export default {
    name : "againhelp" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    //数据模型
    data () {
      return {
        productlist : [] ,
      }
    } ,
    //方法
    methods : {
      getproductlist () {

        let initcount = 5;

        dlapi.getmyagainhelplist( this.getloginuserid , initcount ).then( ( res ) => {
          console.log( 're' , res )

          if ( res != null && res.length > 0 ) {
            this.productlist = res;
          }
          else {
            this.productlist = [];
          }

          console.log( 'this.productlist' , this.productlist )
        } );
      } ,

    } ,
    //计算属性
    computed : {
      /**
       * 列表数量
       * @returns {number}
       */
      replycount () {
        if ( this.productlist != null && this.productlist.length > 0 ) {
          return this.productlist.length;
        }

        /**
         *作者:  chenghao
         *Date: 2019/4/25
         *Time: 14:28
         *功能: 没有就默认返回0

         */

        return 0;
      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'againhelp mouted' )
    } ,
    onLoad () {
      console.log( 'againhelp onLoad' )
    } ,
    onShow () {

      console.log( 'againhelp onShow' );

      this.getproductlist();
    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style src="./againhelp.css"
       scoped>
</style>
