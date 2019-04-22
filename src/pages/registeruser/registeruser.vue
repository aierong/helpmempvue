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
               placeholder="请输入密码"/>
    <van-field :value="pwd2"
               label="再次密码"
               @change="pwd2Change"
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

      } ,
      backpage () {

      } ,
      useridChange ( event ) {
        //
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
