<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="userid"
               label="手机号"
               required
               @change="useridChange"
               placeholder="请输入手机号"/>
    <van-field :value="username"
               label="姓名"
               required
               @change="usernameChange"
               placeholder="请输入姓名"/>
    <van-field :value="pwd"
               label="密码"
               required
               @change="pwdChange"
               type="password"
               placeholder="请输入密码"/>
    <van-field :value="pwd2"
               label="再次密码"
               required
               @change="pwd2Change"
               type="password"
               placeholder="请输入密码"/>
    <van-button size="large"
                type="primary"
                @click="reg">注册
    </van-button>
    <van-button size="large"
                @click="backpage">返回
    </van-button>

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

  import * as userapi from '@/common/BmobApi/users.js'

  export default {
    name : "registeruser" ,
    //数据模型
    data () {
      return {
        userid : '' ,
        pwd : '' ,
        pwd2 : '' ,
        username : ''
      }
    } ,
    //方法
    methods : {
      reg () {
        if ( !this.userid ) {

          Toast.fail( '请输入手机号码' );

          return;
        }

        if ( !this.username ) {

          Toast.fail( '请输入姓名' );

          return;
        }

        if ( !this.pwd ) {
          // this.$toast( "请输入密码" )

          Toast.fail( '请输入密码' );

          return;
        }

        if ( this.pwd != this.pwd2 ) {

          Toast.fail( '2次密码不一致' );

          return;
        }

        if ( this.userid.length != 11 ) {

          Toast.fail( '手机号码长度不正确' );

          return;
        }

        ( async () => {

          let result = await userapi.isexistsuserid( this.userid )

          console.log( result )

          if ( result.isexists ) {

            Toast.fail( '手机号码已存在' );

            return
          }
          else {
            let addresult = await userapi.adduser( {
              userid : this.userid ,
              username : this.username ,
              pwd : this.pwd
            } )

            console.log( 'addresult' , addresult )

            if ( addresult != null ) {

              const toast = Toast.loading( {
                duration : 0 ,
                forbidClick : true ,
                loadingType : 'spinner' ,
                message : '成功'
              } );

              setInterval( () => {

                //关闭提示
                Toast.clear();

                this.backpage();

              } , 2000 );

              return;
            }
            else {
              Toast.fail( '失败' );

              return
            }

            return
          }
        } )()

      } ,
      backpage () {
        wx.navigateBack()
      } ,
      usernameChange ( event ) {
        this.username = event.mp.detail
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
