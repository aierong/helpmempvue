<template>
  <div>


    <div v-if="!isvaliduser">
      <van-nav-bar right-text="注册"
                   @clickright="onClickRight"/>
      <van-field :value="userid"
                 label="手机号"
                 required
                 @change="useridChange"
                 placeholder="请输入手机号"/>
      <van-field :value="pwd"
                 label="密码"
                 required
                 @change="pwdChange"
                 type="password"
                 placeholder="请输入密码"/>
      <van-button size="large"
                  type="primary"
                  @click="userlogin">登录
      </van-button>

      <!--
注意要配一个van-toast,才会显示提示 ,默认id van-toast

-->
      <van-toast id="van-toast"/>
    </div>
  </div>
</template>

<script>
  // 配置文件json也要配置,这里代码也要引用
  // 代码中也要引用
  // 注意引用路径
  import Toast from '../../../static/vant/toast/toast';

  import * as constant from '@/common/constant.js'

  import * as userapi from '@/common/BmobApi/users.js'

  export default {
    data () {
      return {

        isvaliduser : false ,
        userid : '' ,
        pwd : '' ,
      }
    } ,

    methods : {
      useridChange ( event ) {

        this.userid = event.mp.detail
      } ,
      pwdChange ( event ) {
        this.pwd = event.mp.detail
      } ,
      onClickRight () {
        //转向 注册页面
        const url = "../registeruser/main"
        wx.navigateTo( { url : url } )
      } ,
      getStorageValue () {
        let StorageValue = wx.getStorageSync( constant.StorageName )

        return StorageValue;
      } ,
      setStorageValue ( vals ) {
        wx.setStorageSync( constant.StorageName , vals )
      } ,
      SaveVuexAndSwitch ( userobj ) {
        //分发 action 修改状态
        this.$store.dispatch( 'SetupUser' , userobj )

        // 跳转
        wx.switchTab( {
          url : "../me/main"
        } );
      } ,
      userlogin () {
        //检查数据有效性
        if ( !this.userid ) {

          Toast.fail( '请输入手机号码' );

          return;
        }

        if ( !this.pwd ) {

          Toast.fail( '请输入密码' );

          return;
        }

        let userid = this.userid;
        let pwd = this.pwd;

        //调用 api
        // 成功 写入本地存储 写入vuex  页面跳转
        userapi.login( userid , pwd ).then( ( res ) => {
          console.log( 'res' , res )
          if ( res != null && res.isok ) {
            //登录成功
            var now = new Date();
            let userobj = {
              userid : userid ,
              username : res.data.username ,
              logintime : now
            };
            this.setStorageValue( userobj );

            this.SaveVuexAndSwitch( userobj )
          }
          else {
            Toast.fail( '登录失败' );

            return;
          }
        } );
      } ,

    } ,

    created () {
      // let app = getApp()
    } ,
    //生命周期(mounted)
    mounted () {
      let StorageValue = this.getStorageValue();

      console.log( 'StorageValue' , StorageValue )

      if ( StorageValue ) {
        // 取到值了
        console.log( StorageValue )

        //取到值 判断是否过期
        var now = new Date();

        if ( StorageValue.logintime ) {
          let validtime = StorageValue.logintime;

          validtime.setDate( validtime.getDate() + constant.validday );

          console.log( 'validtime' , validtime )

          if ( now.getTime() <= validtime.getTime() ) {
            this.isvaliduser = true;

            this.SaveVuexAndSwitch( StorageValue )

            // //把值取回来
            // //分发 action 修改状态
            // this.$store.dispatch( 'SetupUser' , StorageValue )
            //
            // // 跳转
            // wx.switchTab( {
            //   url : "../me/main"
            // } );
          }
          else {
            //过期了,需要重新登录
            this.isvaliduser = false;
          }
        }
      }
      else {
        //如果key的值不存在，就会运行这里
        // console.log( '没有取到数据' )

        this.isvaliduser = false;
      }
    } ,
  }
</script>

<style src="./index.css"
       scoped>
</style>
