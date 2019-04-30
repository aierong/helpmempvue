<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <!--    use-footer-slot-->
    <van-panel :key="index"
               v-for="(item,index) in productlist"
               :title="(index+1)+ '.工单:'+item.productno"
               :status="'客户:'+item.custno">


      <van-row>
        <van-col span="24">
          <span class="mytxt"> {{ '订单:' + item.pono +' 数量:' + item.poqty }}</span>
        </van-col>

      </van-row>
      <van-row>
        <van-col span="24">
          <span class="mytxt">{{ '产品:' + item.itemno + '(' + item.itemsname +')' }}</span>
        </van-col>

      </van-row>

      <van-row>
        <van-col span="14">
          <span class="mytxt">{{  '求助人:'+item.username  }}</span>
        </van-col>

        <van-col style="text-align: right;"
                 span="10">
          <van-button style="padding-right: 10px;padding-bottom: 10px;"
                      plain
                      type="primary"
                      @click="replydata(item.productno,item.csexpectdate,item.objectId)"
                      size="mini">答复
          </van-button>

        </van-col>
      </van-row>


    </van-panel>
  </div>

</template>


<!-- js脚本代码片段 -->
<script>
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as utils from '@/common/utils.js'

  export default {
    name : "reply" ,
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
        //代码搞这里
        let initcount = 5;

        dlapi.getmyreply( this.getloginuserid , initcount , [] ).then( ( res ) => {
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
      replydata ( productno , csexpectdate , objectId ) {
        //转向
        this.gotoreplypage( productno , csexpectdate , objectId );
      } ,
      gotoreplypage ( productno , csexpectdate , objectId ) {
        const url = "../replydata/main?productno=" + productno
          + "&csexpectdate=" + csexpectdate
          + "&objectId=" + objectId;

        wx.navigateTo( { url : url } )
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
      console.log( 'reply mouted' )

    } ,
    onLoad () {
      console.log( 'reply onLoad' )
    } ,
    onShow () {

      console.log( 'reply onShow' );

      this.getproductlist();
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./reply.css">
</style>
