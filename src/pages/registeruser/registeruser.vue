<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="userid"
               label="手机号"
               @change="useridChange"
               placeholder="请输入手机号"/>
    <van-field :value="pwd"
               label="密码"
               @change="pwdChange"
               type="password"
               placeholder="请输入密码"/>
    <van-field :value="pwd2"
               label="再次密码"
               @change="pwd2Change"
               type="password"
               placeholder="请输入密码"/>
    <button type="primary"
            @click="reg">注册
    </button>
    <button @click="backpage">返回</button>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  export default {
    name : "registeruser" ,
    //数据模型
    data () {
      return {
        userid : '' ,
        pwd : '' ,
        pwd2 : ''
      }
    } ,
    //方法
    methods : {
      reg () {
        if ( !this.userid ) {
          // this.$toast( "请输入手机号码" )
          wx.showToast( {
            title : '请输入手机号码' , //提示的内容,
            duration : 2000 , //延迟时间,
            mask : true , //显示透明蒙层，防止触摸穿透,

          } );

          return;
        }

        if ( !this.pwd ) {
          // this.$toast( "请输入密码" )

          wx.showToast( {
            title : '请输入密码' , //提示的内容,
            duration : 2000 , //延迟时间,
            mask : true , //显示透明蒙层，防止触摸穿透,

          } );
          return;
        }

        if ( this.pwd != this.pwd2 ) {
          wx.showToast( {
            title : '2次密码不一致' , //提示的内容,
            duration : 2000 , //延迟时间,
            mask : true , //显示透明蒙层，防止触摸穿透,

          } );
          return;
        }

        if ( this.userid.length != 11 ) {
          wx.showToast( {
            title : '手机号码长度不正确' , //提示的内容,
            duration : 2000 , //延迟时间,
            mask : true , //显示透明蒙层，防止触摸穿透,

          } );
          return;
        }



      } ,
      backpage () {
        wx.navigateBack()
      } ,
      useridChange ( event ) {

        this.userid = event.mp.detail
      } ,
      pwdChange ( event ) {
        this.pwd = event.mp.detail
      } ,
      pwd2Change ( event ) {
        this.pwd2 = event.mp.detail
      }
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
       src="./registeruser.css">

</style>
