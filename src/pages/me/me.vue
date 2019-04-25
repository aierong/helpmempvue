<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon @click="helpclick"
                  name="friends-o"
                  size="36px"/>
        <br>求助
      </van-col>
      <van-col span="6">
        <van-icon @click="replyclick"
                  name="comment-o"
                  size="36px"/>
        <br>答复
      </van-col>
      <van-col span="6">
        <van-icon @click="queryclick"
                  name="search"
                  size="36px"/>
        <br>查询
      </van-col>
      <van-col span="6">
        <van-icon @click="exitclick"
                  name="exchange"
                  size="36px"/>
        <br>退出
      </van-col>
    </van-row>
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
        msg : ''
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
        //
        wx.switchTab( { url : "../helpmeadd/main" } );
      } ,
      replyclick () {
        //
        wx.switchTab( { url : "../reply/main" } );
      } ,
      queryclick () {
        //
        wx.switchTab( { url : "../querylist/main" } );
      } ,

      exitclick () {
        //弹窗提示一下
        let that = this;

        wx.showModal( {
          title : '提示' ,
          content : '确定退出吗?' ,
          success ( res ) {
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
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./me.css">
</style>
