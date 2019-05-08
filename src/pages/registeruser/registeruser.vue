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
               clearable
               @change="useridChange"
               placeholder="请输入手机号"/>
    <van-field :value="username"
               label="姓名"
               required
               clearable
               @change="usernameChange"
               placeholder="请输入姓名"/>
    <van-field :value="pwd"
               label="密码"
               required
               clearable
               @change="pwdChange"
               type="password"
               placeholder="请输入密码"/>
    <van-field :value="pwd2"
               label="再次密码"
               required
               clearable
               @change="pwd2Change"
               type="password"
               placeholder="请再次输入密码"/>
    <mybr/>
    <van-button size="large"
                type="primary"
                @click="reg">注册
    </van-button>
    <van-button size="large"
                @click="backpage">返回
    </van-button>


  </div>

</template>

<!-- js脚本代码片段 -->
<script>

  import * as userapi from '@/common/BmobApi/users.js'

  import mybr from '@/components/mybr.vue'

  import { mixmethods } from '@/mixin/commonmethods.js'

  export default {
    name : "registeruser" ,
    components : {
      mybr
    } ,
    //导入混入对象 可以是多个,数组
    mixins : [

      mixmethods
    ] ,
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
      /**
       * 注册单击
       */
      reg () {

        if ( !this.userid ) {

          this.ShowToastMsg( '请输手机号' )

          return;
        }

        if ( !this.username ) {

          this.ShowToastMsg( '请输入姓名' )
          return;
        }

        if ( !this.pwd ) {

          this.ShowToastMsg( '请输入密码' )
          return;
        }

        if ( this.pwd != this.pwd2 ) {

          this.ShowToastMsg( '2次密码不一致' )
          return;
        }

        if ( this.userid.length != 11 ) {

          this.ShowToastMsg( '手机号码长度不正确' )
          return;
        }

        ( async () => {

          let result = await userapi.isexistsuserid( this.userid )

          // console.log( result )

          if ( result.isexists ) {

            this.ShowToastMsg( '手机号已存在' )
            return
          }
          else {
            let addresult = await userapi.adduser( {
              userid : this.userid ,
              username : this.username ,
              pwd : this.pwd
            } )

            // console.log( 'addresult' , addresult )

            if ( addresult != null ) {

              let _duration = 3000;

              wx.showToast( {
                title : '成功' , //提示的内容,
                icon : 'success' , //图标,
                duration : _duration , //延迟时间,
                mask : true , //显示透明蒙层，防止触摸穿透,
                success : res => {
                  setInterval( () => {

                    this.backpage();

                  } , _duration );
                }

              } );

              return;
            }
            else {

              this.ShowToastMsg( '失败' )

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
      console.log( 'registeruser mouted' )

    } ,
    onLoad () {
      console.log( 'registeruser onLoad' )
    } ,
    onShow () {

      console.log( 'registeruser onShow' );

    } ,
    onHide () {
      console.log( 'registeruser onHide' );
    } ,
    onUnload () {
      console.log( 'registeruser onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./registeruser.css">
</style>
