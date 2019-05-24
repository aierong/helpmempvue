<!--
作者:chenghao
功能:vue页
-->

<!--
html代码片段
-->
<template>

  <div>

    <van-field :value="productinfo.productno"
               required
               clearable
               label="工程单"
               disabled
               placeholder="请选择工程单"
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselectproduct">选择
      </van-button>
    </van-field>
    <van-field :value="productinfo.custno"
               label="客户编号"
               disabled/>
    <van-field :value="productinfo.pono"
               label="订单号"
               disabled/>
    <van-field :value="productinfo.poqty"
               label="数量"
               disabled/>
    <van-field :value="productinfo.itemno + '(' + productinfo.itemsname + ')' "
               label="物料"
               disabled/>

    <van-field :value="csexpectdate"
               label="期望交期"
               disabled
               required
               placeholder="请选择期望交期"
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselectdate">选择
      </van-button>
    </van-field>
    <van-field :value="helpmaninfo.helppmcname1"
               label="求助人1"
               disabled
               required
               placeholder="请选择求助人1"
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselectuser1">选择
      </van-button>

    </van-field>
    <van-field :value="helpmaninfo.helppmcname2"
               label="求助人2"
               disabled
               placeholder="请选择求助人2"
               use-button-slot>

      <van-button slot="button"
                  size="mini"
                  type="warning"
                  @click="onuserselectclear2">清除
      </van-button>
    </van-field>
    <van-field :value="comment"
               label="备注"
               clearable
               @change="commentChange"
               placeholder="请输入备注"/>

    <mybr/>
    <van-button size="large"
                type="primary"
                @click="savedata">保存
    </van-button>

    <!--    放最后，一个弹窗 -->
    <van-popup :show="isshowdatepicker"
               position="bottom">

      <van-datetime-picker type="date"
                           :value="currentDate"
                           :min-date="minDate"
                           @confirm="userselectdate"
                           @cancel="userselectdatecancel"/>
    </van-popup>

  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  import dayjs from 'dayjs'

  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'
  import * as constant from '@/common/constant.js'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import { mixmethods } from '@/mixin/commonmethods.js'

  import { logruntype } from '@/common/constant.js';

  import mybr from '@/components/mybr.vue'

  export default {
    name : "helpmeadd" ,
    components : {
      mybr
    } ,
    //导入混入对象 可以是多个,数组
    mixins : [
      loginuserdatamix ,
      mixmethods
    ] ,
    //数据模型
    data () {
      return {
        isshowdatepicker : false ,
        currentDate : new Date().getTime() ,
        minDate : new Date().getTime() ,

        csexpectdate : '' ,
        comment : '' ,

        //最多处理多少 未完成工程单
        maxsavecount : 9
      }
    } ,
    //方法
    methods : {
      commentChange ( event ) {
        this.comment = event.mp.detail
      } ,
      onuserselectclear2 () {
        if ( this.helpmaninfo != null ) {

          this.$store.dispatch( 'ClearUserSelectHelpMan2' );

        }
      } ,
      onselectuser1 () {
        this.gotouserselectpage();
      } ,

      gotouserselectpage () {
        //转向  用户选择页面
        const url = "../selectuser/main"
        wx.navigateTo( { url : url } )
      } ,
      onselectproduct () {

        //转向  产品选择页面
        const url = "../selectproduct/main"
        wx.navigateTo( { url : url } )
      } ,
      onselectdate () {
        this.isshowdatepicker = true;
      } ,
      userselectdate ( event ) {
        const { detail } = event.mp;

        let selectdate = new Date( detail );  //得到日期
        let _now2 = dayjs( selectdate );
        this.csexpectdate = _now2.format( constant.DateFormatStringYMD )
        // yyyy-MM-dd HH:mm:ss
        this.closeDateWin();
      } ,
      userselectdatecancel () {
        this.closeDateWin();
      } ,
      //关闭时间弹窗
      closeDateWin () {
        this.isshowdatepicker = false;
      } ,

      //保存数据
      async savedata () {
        //运行逻辑:1.构建数据，2.再做检查判断 3.保存数据

        let now = new Date();

        let newdata = {
          userid : this.getloginuserid ,
          username : this.getloginusername ,
          productno : this.productinfo.productno ,
          custno : this.productinfo.custno ,

          pono : this.productinfo.pono ,
          itemno : this.productinfo.itemno ,
          itemsname : this.productinfo.itemsname ,
          poqty : this.productinfo.poqty ,

          helptimes : 1 ,
          //最后求助时间
          helplasttime : dayjs( now ).format( constant.DateFormatString ) ,
          csexpectdate : this.csexpectdate ,
          pmsreplydate : '' ,
          addpmcreplycomment : '' ,
          addpmcreplydate : '' ,
          addpmcman : '' ,
          addpmcmanname : '' ,
          comment : this.comment ,
          //未完成的
          overdate : '' ,
          isover : false ,
          helppmc1 : this.helpmaninfo.helppmc1 ,
          helppmc2 : this.helpmaninfo.helppmc2 ,
          helppmcname1 : this.helpmaninfo.helppmcname1 ,
          helppmcname2 : this.helpmaninfo.helppmcname2 ,
        }

        //构建日志数据
        let objlog = {
          logruntype : logruntype.add ,
          userid : newdata.userid ,
          username : newdata.username ,
          productno : newdata.productno ,
          dates : newdata.csexpectdate ,
          comment : newdata.comment
        };
        // console.log( 'newdata' , newdata )
        // console.log( 'objlog' , objlog )

        // return;

        //开始做判断了
        if ( newdata.productno ) {
          // let msg = this.checkproductsave( newdata.productno );

          let isexists = await dlapi.isexistsproductno( newdata.productno );
          // console.log( 'isexists' , isexists )

          if ( isexists ) {

            this.ShowToastMsg( '工程单号已经存在' )
            return;
          }

          let counts = await dlapi.getontworkcounts( this.getloginuserid );

          // console.log( 'counts' , counts )

          if ( counts > this.maxsavecount ) {

            this.ShowToastMsg( '您的未完成工程单已超过' + this.maxsavecount + '个' )
            return;
          }

        }
        else {

          this.ShowToastMsg( '工程单号为空' )
          return;
        }

        // console.log( 'newdata.csexpectdate' , newdata.csexpectdate )
        if ( newdata.csexpectdate ) {

        }
        else {

          this.ShowToastMsg( '期望交期为空' )
          return;
        }

        if ( newdata.helppmc1 ) {

        }
        else {

          this.ShowToastMsg( '求助人1为空' )
          return;
        }

        //开始保存吧
        wx.showLoading( {
          title : '保存中...' ,
          mask : true , //显示透明蒙层，防止触摸穿透
        } );

        var result = await Promise.all( [
          dlapi.adddl( newdata ) ,
          dllogapi.adddllog( objlog ) ,
          utils.runlongtims( 2000 )
        ] )

        // 取消加载动画
        wx.hideLoading()

        // console.log( '2ge' , result )
        if ( result != null && result.length >= 2 ) {
          if ( result[ 0 ] != null && result[ 1 ] != null ) {
            // Toast.success( '成功' );
            this.ShowToastMsg( '成功' , true , 1500 )
            this.cleardata();

            return;
          }
        }

        this.ShowToastMsg( '失败' )
        this.cleardata();

        return;
      } ,
      cleardata () {
        this.csexpectdate = ''
        this.comment = ''

        this.$store.dispatch( 'ClearUserSelectProductData' );
        this.$store.dispatch( 'ClearUserSelectHelpManData' );

      }
    } ,
    //计算属性
    computed : {
      productinfo () {
        return this.$store.state.userselectproductdata;

      } ,
      /**
       * 用户选择的人员
       * @returns {default.userselecthelpman|{helppmc2, helppmc1, helppmcname1, helppmcname2}|*|__webpack_exports__.a.userselecthelpman}
       */
      helpmaninfo () {

        return this.$store.state.userselecthelpman;

      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'helpmeadd mouted' )
    } ,
    beforeCreate () {
      console.log( 'helpmeadd beforeCreate' )
    } ,
    created () {
      console.log( 'helpmeadd created' )
    } ,
    onLoad () {
      console.log( 'helpmeadd onLoad' )
    } ,
    onShow () {

      console.log( 'helpmeadd onShow' );
    } ,
    onReady () {
      console.log( 'helpmeadd onReady' )
    } ,
    onHide () {
      console.log( 'helpmeadd onHide' );
    } ,
    onUnload () {
      console.log( 'helpmeadd onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./helpmeadd.css">
</style>
