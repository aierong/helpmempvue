<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-panel :key="index"
               v-for="(item,index) in productlist"
               :title="(index+1)+ '.工单:'+item.productno"
               :status="'客户:'+item.custno"
               use-footer-slot>

      <view class="txt">
        {{ '订单:' + item.pono +' 数量:' + item.poqty }}
      </view>
      <view class="txt">
        {{ '产品:' + item.itemno + '(' + item.itemsname +')' }}
      </view>

      <view slot="footer">
        <van-row>
          <van-col span="18">
            <div>qq</div>
          </van-col>
          <!--
 加个样式把按钮搞右边去
 -->
          <van-col style="text-align: right;"
                   span="6">
            <van-button plain
                        type="primary"
                        @click="replydata(item)"
                        size="mini">答复
            </van-button>
          </van-col>
        </van-row>
      </view>
    </van-panel>
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
      replydata ( item ) {
        //暂时转向
        const url = "../detaildata/main"
        wx.navigateTo( { url : url } )
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

      this.getproductlist();
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
