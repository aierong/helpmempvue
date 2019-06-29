<!--
作者:chenghao
Date: 2019/5/2
Time: 19:44
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    <div style="margin-bottom: 6px;"
         v-if="replycount>0"
         :key="index"
         v-for="(item,index) in productlist">
      <van-panel :title="(index+1)+ '.工单:'+item.productno"
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
            <van-button style="margin-bottom: 10px;margin-right: 10px;"
                        plain
                        type="primary"
                        hairline
                        round
                        @click="againhelpdata(item.productno,item.objectId)"
                        size="mini">再求助
            </van-button>

          </van-col>
        </van-row>
      </van-panel>
    </div>
    <van-panel v-if="isshownulllisttxt">

      <view class="nulltxt">空空也,快来求助吧!</view>
    </van-panel>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import { commoncomputed } from '@/mixin/commoncomputed.js'
  import { mixmethods } from '@/mixin/commonmethods.js'

  import * as dlapi from '@/common/BmobApi/dl.js'

  export default {
    name : "againhelp" ,
    //导入混入对象 可以是多个,数组
    mixins : [
      loginuserdatamix ,
      commoncomputed ,
      mixmethods
    ] ,

    //下拉刷新
    onPullDownRefresh () {

      this.getproductlist()

      wx.stopPullDownRefresh()
    } ,
    //数据模型
    data () {
      return {
        productlist : [] ,

        //是显示空表格提示文本
        isshownulllisttxt : false ,
      }
    } ,
    //方法
    methods : {
      getproductlist () {

        // let initcount = 5;

        dlapi.getmyagainhelplist( this.getloginuserid , 0 ).then( ( res ) => {
          // console.log( 're' , res )

          if ( res != null && res.length > 0 ) {
            this.productlist = res;

            this.isshownulllisttxt = false;
          }
          else {
            this.productlist = [];

            this.isshownulllisttxt = true;
          }

          // console.log( 'this.productlist' , this.productlist )
        } );
      } ,
      againhelpdata ( productno , objectId ) {
        //转向
        this.gotoagainhelppage( productno , objectId );
      } ,
      gotoagainhelppage ( productno , objectId ) {
        const url = "../againhelpdata/main?productno=" + productno
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
      console.log( 'againhelp mouted' )
    } ,
    beforeCreate () {
      console.log( 'againhelp beforeCreate' )
    } ,
    created () {
      console.log( 'againhelp created' )
    } ,
    onLoad () {
      console.log( 'againhelp onLoad' )

      this.getproductlist();
    } ,
    onShow () {

      console.log( 'againhelp onShow' );

      //操作成功 ，我们刷新一下
      if ( this.getissaveok ) {
        this.getproductlist();

        //this.$store.dispatch( 'UpdateSaveOk' , false );  //恢复状态
        this.UpdateIsSaveOkToFslse();  ////恢复状态
      }
      // this.getproductlist();
    } ,
    onReady () {
      console.log( 'againhelp onReady' )
    } ,
    onHide () {
      console.log( 'againhelp onHide' );
    } ,
    onUnload () {
      console.log( 'againhelp onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style src="./againhelp.css"
       scoped>
</style>
