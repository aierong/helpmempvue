<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon @click="helpclick"
                  name="friends-o"
                  size="36px"/>
        <br>填求助
      </van-col>
      <van-col span="8">
        <van-icon @click="replyclick"
                  name="comment-o"
                  size="36px"/>
        <br>待答复
      </van-col>
      <van-col span="8">
        <van-icon @click="againhelplick"
                  name="smile-comment-o"
                  size="36px"/>
        <br>再求助
      </van-col>

    </van-row>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon @click="queryclick"
                  name="search"
                  size="36px"/>
        <br>查询
      </van-col>
      <van-col span="8">
        <van-icon @click="FXclick"
                  name="flower-o"
                  size="36px"/>
        <br>分享
      </van-col>
      <van-col span="8">
        <van-icon @click="exitclick"
                  name="exchange"
                  size="36px"/>
        <br>退出
      </van-col>
    </van-row>

    <!--    @close="onCloseitem"-->
    <van-action-sheet :show="show1"
                      :actions="actions1"

                      @cancel="oncancel"
                      cancel-text="取消"
                      @select="onSelectitem"/>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as constant from '@/common/constant.js'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  import { mixmethods } from '@/mixin/commonmethods.js'

  export default {
    name : "me" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix , mixmethods ] ,
    //数据模型
    data () {
      return {
        actions1 : [

          {
            name : '分享' ,
            subname : '分享给好友' ,
            openType : 'share'
          } ,

        ] ,
        show1 : false ,
      }
    } ,
    //方法
    methods : {
      //退出系统，
      ExitSystem () {
        // console.log( 'into ExitSystem' )

        //清除本地存储
        wx.removeStorageSync( constant.StorageName )

        //分发 action 修改状态
        this.$store.dispatch( 'SetupUser' , null )

        //转向 登录页面
        const url = "../index/main"
        // wx.navigateTo( { url : url } )

        wx.reLaunch( { url : url } );
      } ,
      // //设置页面标题
      // setuppagetitle () {
      //   let _title = this.getloginusername + '的主页'
      //
      //   wx.setNavigationBarTitle( { title : _title } );
      // } ,
      helpclick () {

        wx.switchTab( { url : "../helpmeadd/main" } );
      } ,
      replyclick () {

        wx.switchTab( { url : "../reply/main" } );
      } ,
      queryclick () {

        wx.switchTab( { url : "../querylist/main" } );
      } ,
      againhelplick () {
        wx.switchTab( { url : "../againhelp/main" } );
      } ,
      FXclick () {
        this.show1 = true;
      } ,
      // onCloseitem () {
      //   console.log( this.show1 )
      //   this.show1 = false;
      //
      // } ,
      oncancel () {
        this.show1 = false;
      } ,
      onSelectitem ( event ) {
        // console.log( event )
        let obj = event.mp.detail;

        // console.log( obj )

        //取到选择的值
        let name = obj.name;

        console.log( name )

        this.show1 = false;

      } ,
      exitclick () {
        //弹窗提示一下

        wx.showModal( {
          title : '提示' ,
          content : '确定退出吗?' ,
          success : ( res ) => {
            if ( res.confirm ) {
              // console.log('用户点击确定')

              that.ExitSystem();
            }
            else if ( res.cancel ) {
              // console.log('用户点击取消')
            }
          }
        } )

      } ,
    } ,
    //计算属性
    computed : {
      //name() {
      //代码搞这里
      //return this.data;
      //}
    } ,
    onShareAppMessage () {
      return {
        title : '填单帮助我' ,
        path : '/pages/index/main' ,
        imageUrl : '/static/img/logo.png'
      }
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'me mouted' )

      let _title = this.getloginusername + '的主页';
      this.setuppagetitle( _title );
    } ,
    onLoad () {
      console.log( 'me onLoad' )
    } ,
    onShow () {

      console.log( 'me onShow' );
    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./me.css">
</style>
