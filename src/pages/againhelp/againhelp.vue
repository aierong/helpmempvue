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
    <van-panel v-if="replycount<=0">
      <mybr/>
      <mybr/>
      <mybr/>
      <view style="text-align: center;color: green;">空空也,快来求助吧!</view>
    </van-panel>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import * as dlapi from '@/common/BmobApi/dl.js'

  import mybr from '@/components/mybr.vue'

  export default {
    name : "againhelp" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    components : {
      mybr
    } ,
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
    onLoad () {
      console.log( 'againhelp onLoad' )
    } ,
    onShow () {

      console.log( 'againhelp onShow' );

      this.getproductlist();
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
