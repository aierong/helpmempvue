<!--
作者:chenghao
功能:vue页
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
                        @click="replydata(item.productno,item.csexpectdate,item.objectId)"
                        size="mini">答复
            </van-button>

          </van-col>
        </van-row>
      </van-panel>

    </div>
    <van-panel v-if="replycount<=0">
      <mybr/>
      <mybr/>
      <mybr/>
      <view style="text-align: center;color: green;">空空也,快叫上你的小伙伴来求助你吧!</view>
    </van-panel>
  </div>

</template>


<!-- js脚本代码片段 -->
<script>
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as utils from '@/common/utils.js'

  import mybr from '@/components/mybr.vue'

  export default {
    name : "reply" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    components : {
      mybr
    } ,
    //下拉刷新
    onPullDownRefresh () {

      this.getproductlist()

      wx.stopPullDownRefresh()
    } ,
    //数据模型
    data () {
      return {

        productlist : []

      }
    } ,
    //方法
    methods : {

      getproductlist () {

        // let initcount = 5;

        dlapi.getmyreply( this.getloginuserid , 0 , [] ).then( ( res ) => {
          // console.log( 're' , res )

          if ( res != null && res.length > 0 ) {
            this.productlist = res;
          }
          else {
            this.productlist = [];
          }

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
      getissaveok () {
        return this.$store.getters.getissaveok;
      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'reply mouted' )

    } ,
    beforeCreate () {
      console.log( 'reply beforeCreate' )
    } ,
    created () {
      console.log( 'reply created' )
    } ,
    onLoad () {
      console.log( 'reply onLoad' )

      this.getproductlist();
    } ,
    onShow () {

      console.log( 'reply onShow' );

      // console.log( 'getissaveok' , this.getissaveok )

      //操作成功 ，我们刷新一下
      if ( this.getissaveok ) {
        this.getproductlist();

        this.$store.dispatch( 'UpdateSaveOk' , false );  //恢复状态
      }
    } ,
    onReady () {
      console.log( 'reply onReady' )
    } ,
    onHide () {
      console.log( 'reply onHide' );
    } ,
    onUnload () {
      console.log( 'reply onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./reply.css">
</style>
