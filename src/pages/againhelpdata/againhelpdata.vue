<!--
作者:chenghao
Date: 2019/5/3
Time: 20:39
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="csexpectdate"
               label="期望交期"
               disabled
               required
               placeholder="请选择交期"
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselectdate">选择
      </van-button>
    </van-field>
    <van-field :value="comment"
               label="备注"
               clearable
               @change="commentChange"
               placeholder="请输入求助备注"/>
    <mybr/>
    <van-button size="large"
                type="primary"
                @click="savedata">再求助
    </van-button>

    <van-button size="large"
                @click="backpage">返回
    </van-button>
    <mybr/>
    <detaildata :userselectproductno="userselectproductno"></detaildata>


  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  import detaildata from '@/components/detaildata/index.vue'
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'
  import * as constant from '@/common/constant.js'

  import mybr from '@/components/mybr.vue'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import { mixmethods } from '@/mixin/commonmethods.js'

  import { logruntype } from '@/common/constant.js';

  import dayjs from 'dayjs'

  export default {
    name : "againhelpdata" ,
    //导入混入对象 可以是多个,数组
    mixins : [
      loginuserdatamix ,
      mixmethods
    ] ,
    components : {
      detaildata ,
      mybr
    } ,
    //数据模型
    data () {
      return {
        //CJ424205635
        userselectproductno : '' ,

        datelist : [] ,

        csexpectdate : '' ,
        comment : '' ,
        // csexpectdate : '' ,
        objectId : ''
      }
    } ,
    //方法
    methods : {
      onselectdate () {

        wx.showActionSheet( {
          //按钮的文字数组，数组长度最大为 6 个,
          itemList : this.datelist ,
          //按钮的文字颜色
          itemColor : '#000000' ,
          success : ( res ) => {
            //tapIndex就是用户点击的按钮序号,从上到下的顺序,从0开始
            let selectval = this.datelist[ res.tapIndex ];

            console.log( selectval )

            this.csexpectdate = selectval;
          }
        } );
      } ,
      getdatelist () {
        this.datelist = utils.getdatelist( true ,
          6 ,
          constant.DateFormatStringYMD ,
          false )

      } ,
      commentChange ( event ) {
        let vals = event.mp.detail;

        this.comment = vals;
      } ,
      async savedata () {
        let now = new Date();
        let nowstr = dayjs( now ).format( constant.DateFormatString );

        let userid = this.getloginuserid;
        let username = this.getloginusername;

        if ( this.csexpectdate ) {

        }
        else {

          this.ShowToastMsg( '请选择交期' )
          return;
        }

        //构建日志数据
        let objlog = {
          logruntype : logruntype.againhelp ,
          userid : userid ,
          username : username ,
          productno : this.userselectproductno ,
          dates : this.csexpectdate ,
          comment : this.comment
        };

        // 加载动画
        wx.showLoading( {
          title : '加载中...' ,
          mask : true , //显示透明蒙层，防止触摸穿透
        } );

        var result = await Promise.all( [
          dlapi.againhelp( this.objectId ,
            nowstr ,
            this.csexpectdate ,

            this.comment ) ,
          dllogapi.adddllog( objlog ) ,
          utils.runlongtims( 3000 )
        ] )

        // 取消加载动画
        wx.hideLoading()

        let _duration = 2000;

        if ( result != null ) {
          wx.showToast( {
            title : '成功' , //提示的内容,
            icon : 'success' , //图标,
            duration : _duration , //延迟时间,
            mask : true , //显示透明蒙层，防止触摸穿透,
            success : res => {
              //标记一下 修改成功，主页面好刷新
              this.$store.dispatch( 'UpdateSaveOk' , true );

              setInterval( () => {
                //运行其他事情
                this.backpage();

              } , _duration );
            }

          } );
        }
        else {
          wx.showToast( {
            title : '失败' , //提示的内容,
            icon : 'none' , //图标,
            duration : _duration , //延迟时间,
            mask : true , //显示透明蒙层，防止触摸穿透,
            success : res => {
              //标记一下 修改失败
              this.$store.dispatch( 'UpdateSaveOk' , false );

              setInterval( () => {
                //运行其他事情
                this.backpage();

              } , _duration );
            }

          } );
        }

      } ,
      backpage () {
        wx.switchTab( { url : "../againhelp/main" } );
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
      console.log( 'againhelpdata mouted' )

    } ,
    beforeCreate () {
      console.log( 'againhelpdata beforeCreate' )
    } ,
    created () {
      console.log( 'againhelpdata created' )
    } ,
    onLoad () {
      console.log( 'againhelpdata onLoad' )

      //日期段 取回来
      this.getdatelist();

      this.userselectproductno = this.$mp.query.productno

      this.objectId = this.$mp.query.objectId
    } ,
    onReady () {
      console.log( 'againhelpdata onReady' )
    } ,
    onShow () {

      console.log( 'againhelpdata onShow' );

      this.setuppagetitle( this.userselectproductno + '再次求助' )
    } ,
    onHide () {
      console.log( 'againhelpdata onHide' );
    } ,
    onUnload () {
      console.log( 'againhelpdata onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./againhelpdata.css">
</style>
