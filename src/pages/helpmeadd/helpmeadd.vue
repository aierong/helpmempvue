<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>


    <!--
    disabled 禁止输入
    -->
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
    <!--    <van-field :value="productinfo.itemsname"-->
    <!--               label="物料名称"-->
    <!--               disabled/>-->
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
                  type="primary"
                  @click="onselectuser2">选择
      </van-button>
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

    <van-button size="large"
                type="primary"
                @click="savedata">保存
    </van-button>

    <!--    放最后，一个弹窗-->
    <van-popup :show="isshowdatepicker"
               position="bottom">

      <van-datetime-picker type="date"
                           :value="currentDate"
                           :min-date="minDate"
                           @confirm="userselectdate"
                           @cancel="userselectdatecancel"/>
    </van-popup>
    <!--    放最后，一个 提示-->
    <!--
注意要配一个van-toast,才会显示提示 ,默认id van-toast
-->
    <van-toast id="van-toast"/>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  // 配置文件json也要配置,这里代码也要引用
  // 代码中也要引用
  // 注意引用路径
  import Toast from '../../../static/vant/toast/toast';

  import dayjs from 'dayjs'

  import * as dlapi from '@/common/BmobApi/dl.js'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  export default {
    name : "helpmeadd" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    //数据模型
    data () {
      return {
        isshowdatepicker : false ,
        currentDate : new Date().getTime() ,
        minDate : new Date().getTime() ,

        csexpectdate : '' ,
        comment : '' ,

        //最多处理多少 100
        maxsavecount : 5
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
      onselectuser2 () {
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

        // console.log( detail )
        // console.log( currentTarget )

        let selectdate = new Date( detail );  //得到日期
        let _now2 = dayjs( selectdate );
        this.csexpectdate = _now2.format( 'YYYY-MM-DD' )

        this.closeDateWin();
      } ,
      userselectdatecancel () {
        this.closeDateWin();
      } ,
      //关闭时间弹窗
      closeDateWin () {
        this.isshowdatepicker = false;
      } ,
      async checkproductsave ( productno ) {
        let isexists = await dlapi.isexistsproductno( productno );

        if ( isexists ) {
          return '工程单号已经存在'
        }

        let counts = await dlapi.getontworkcounts( this.getloginuserid );
        if ( counts > this.maxsavecount ) {
          return '您的未完成工程单已超过' + this.maxsavecount + '个'
        }

        return '';
      } ,
      //保存数据
      savedata () {
        // 先构建数据，再做检查判断
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
          helplasttime : '' ,
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

        //开始做判断了
        if ( newdata.productno ) {
          let msg = this.checkproductsave( newdata.productno );

          if ( msg ) {
            Toast.fail( msg );

            return;
          }
        }
        else {
          Toast.fail( '工程单号为空' );

          return;
        }

        if ( newdata.csexpectdate ) {

        }
        else {
          Toast.fail( '期望交期为空' );

          return;
        }

        if ( newdata.helppmc1 ) {

        }
        else {
          Toast.fail( '求助人1为空' );

          return;
        }

        //开始保存吧
        Toast.loading( {
          duration : 0 ,
          //forbidClick	是否禁止背景点击
          forbidClick : true ,
          loadingType : 'spinner' ,
          message : '保存中...'
        } );

        dlapi.adddl( newdata ).then( ( res ) => {
          console.log( 'res' , res );

          //关闭提示
          //Toast.clear		关闭提示
          Toast.clear();

          if ( res != null ) {
            Toast.success( '成功' );
          }
          else {
            Toast.fail( '失败' );
          }

          //保存完成，要清除一下数据
          this.cleardata();

          return;
        } )

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
      helpmaninfo () {
        return this.$store.state.userselecthelpman;

      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'helpmeadd mouted' )
    } ,
    onLoad () {
      console.log( 'helpmeadd onLoad' )
    } ,
    onShow () {

      console.log( 'helpmeadd onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./helpmeadd.css">
</style>
