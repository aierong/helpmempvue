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

    <!--    "van-toast": "/static/vant/toast/index"-->
    <!--    &lt;!&ndash;-->
    <!--   注意要配一个van-toast,才会显示提示 ,默认id van-toast-->
    <!--   &ndash;&gt;-->
    <!--    <van-toast id="van-toast"/>-->

  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  // 配置文件json也要配置,这里代码也要引用
  // 代码中也要引用
  // 注意引用路径
  // import Toast from '../../../static/vant/toast/toast';

  import * as userapi from '@/common/BmobApi/users.js'

  import mybr from '@/components/mybr.vue'

  export default {
    name : "registeruser" ,
    components : {
      mybr
    } ,
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
      displaymsg ( title = '消息' , isicon = false , duration = 2000 ) {
        wx.showToast( {
          title : title , //提示的内容,
          icon : !isicon ? 'none' : 'success' ,
          duration : 2000 , //延迟时间,
          mask : true , //显示透明蒙层，防止触摸穿透,

        } );
      } ,
      reg () {

        if ( !this.userid ) {

          this.displaymsg( '请输手机号' )

          return;
        }

        if ( !this.username ) {

          this.displaymsg( '请输入姓名' )
          return;
        }

        if ( !this.pwd ) {

          this.displaymsg( '请输入密码' )
          return;
        }

        if ( this.pwd != this.pwd2 ) {

          this.displaymsg( '2次密码不一致' )
          return;
        }

        if ( this.userid.length != 11 ) {

          this.displaymsg( '手机号码长度不正确' )
          return;
        }

        ( async () => {

          let result = await userapi.isexistsuserid( this.userid )

          console.log( result )

          if ( result.isexists ) {

            this.displaymsg( '手机号已存在' )
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

              this.displaymsg( '失败' )

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
