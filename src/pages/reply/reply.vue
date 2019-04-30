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

      <!--      <view class="txt">-->
      <!--        {{ '订单:' + item.pono +' 数量:' + item.poqty }}-->
      <!--      </view>-->
      <!--      <view class="txt">-->
      <!--        {{ '产品:' + item.itemno + '(' + item.itemsname +')' }}-->
      <!--      </view>-->
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
                      @click="replydata(item.productno)"
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
      replydata ( productno ) {
        //转向
        this.gotoreplypage( productno );
      } ,
      gotoreplypage ( productno ) {
        const url = "../replydata/main?productno=" + productno;

        wx.navigateTo( { url : url } )
      } ,
      // onselectdate ( index ) {
      //   let that = this;
      //
      //   wx.showActionSheet( {
      //     //按钮的文字数组，数组长度最大为 6 个,
      //     itemList : this.datelist ,
      //     //按钮的文字颜色
      //     itemColor : '#000000' ,
      //     success : res => {
      //       //tapIndex就是用户点击的按钮序号,从上到下的顺序,从0开始
      //       let selectval = that.datelist[ res.tapIndex ];
      //
      //       console.log( selectval )
      //
      //       that.productlist[ index ].pmsreplydate = selectval;
      //     }
      //   } );
      // } ,
      // commentChange ( event , index ) {
      //   // console.log( 'event' , event )
      //   // console.log( index )
      //
      //   let vals = event.mp.detail;
      //   this.productlist[ index ].addpmcreplycomment = vals;
      // } ,
      // getdatelist () {
      //   this.datelist = utils.getdatelist( true , 6 , 'YYYY-MM-DD' )
      //
      //   console.log( 'this.datelist' , this.datelist )
      // } ,
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
      // this.getdatelist();
      this.getproductlist();
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./reply.css">
</style>
