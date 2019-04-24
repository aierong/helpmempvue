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
                  name="pending-payment"
                  size="36px"/>
        <br>求助
      </van-col>
      <van-col span="6">
        <van-icon @click="replyclick"
                  name="bag"
                  size="36px"/>
        <br>答复
      </van-col>
      <van-col span="6">
        <van-icon @click="queryclick"
                  name="fire"
                  size="36px"/>
        <br>查询
      </van-col>
      <van-col span="6">
        <van-icon @click="exitclick"
                  name="logistics"
                  size="36px"/>
        <br>退出
      </van-col>
    </van-row>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as constant from '@/common/constant.js'

  export default {
    name : "me" ,
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
        //清除本地存储
        wx.removeStorageSync( constant.StorageName )

        //分发 action 修改状态
        this.$store.dispatch( 'SetupUser' , null )

        //转向 登录页面
        const url = "../index/main"
        wx.navigateTo( { url : url } )
      } ,
      helpclick () {

      } ,
      replyclick () {

      } ,
      queryclick () {

      } ,
      exitclick () {
        //弹窗提示一下
        wx.showModal( {
          title : '提示' ,
          content : '确定退出吗?' ,
          success ( res ) {
            if ( res.confirm ) {
              // console.log('用户点击确定')

              this.ExitSystem();
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

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./me.css">
</style>
