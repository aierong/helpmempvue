<template>
  <div>

    <div v-if="!isvaliduser">
      <van-nav-bar right-text="注册"
                   @clickright="onClickRight"/>
      <van-field :value="userid"
                 label="手机号"
                 required
                 clearable
                 @change="useridChange"
                 placeholder="请输入手机号"/>
      <van-field :value="pwd"
                 label="密码"
                 required
                 clearable
                 @change="pwdChange"
                 type="password"
                 placeholder="请输入密码"/>
      <mybr/>
      <van-button size="large"
                  type="primary"
                  @click="userlogin">登录
      </van-button>

      <div class="msgtxt">{{ '登录状态保存'+validday+'天' }}</div>

    </div>
  </div>
</template>

<script>


  import * as constant from '@/common/constant.js'

  import * as userapi from '@/common/BmobApi/users.js'

  import mybr from '@/components/mybr.vue'

  import { mixmethods } from '@/mixin/commonmethods.js'

  export default {
    name : "index" ,
    //导入混入对象 可以是多个,数组
    mixins : [

      mixmethods
    ] ,
    //计算属性
    computed : {
      /**
       * 有效天数
       * @returns {default.computed.validday|(function())}
       */
      validday () {

        return constant.validday;
      }
    } ,
    data () {
      return {

        isvaliduser : false ,

        userid : '' ,
        pwd : '' ,

      }
    } ,
    components : {
      mybr
    } ,
    methods : {
      initdata () {
        this.userid = ''
        this.pwd = ''
      } ,
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

          this.ShowToastMsg( '请输手机号' )
          return;
        }

        if ( !this.pwd ) {

          this.ShowToastMsg( '请输入密码' )
          return;
        }

        let userid = this.userid;
        let pwd = this.pwd;

        //调用 api
        // 成功 写入本地存储 写入vuex  页面跳转
        userapi.login( userid , pwd ).then( ( res ) => {
          // console.log( 'res' , res )
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
            // Toast.fail( '登录失败' );
            this.ShowToastMsg( '登录失败' )

            return;
          }
        } );
      } ,

    } ,

    //生命周期(mounted)
    mounted () {
      console.log( 'index mounted' );

      let StorageValue = this.getStorageValue();

      // console.log( 'StorageValue' , StorageValue )

      if ( StorageValue ) {
        // 取到值了
        // console.log( StorageValue )

        //取到值 判断是否过期
        var now = new Date();

        if ( StorageValue.logintime ) {
          let validtime = new Date( StorageValue.logintime );

          validtime.setDate( validtime.getDate() + this.validday );

          if ( now.getTime() <= validtime.getTime() ) {
            this.isvaliduser = true;

            this.SaveVuexAndSwitch( StorageValue )

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
    beforeCreate () {
      console.log( 'index beforeCreate' )
    } ,
    created () {
      console.log( 'index created' )
    } ,
    onLoad () {
      console.log( 'index onLoad' )

    } ,
    onShow () {

      console.log( 'index onShow' );

    } ,
    onReady () {
      console.log( 'index onReady' )
    } ,
    onHide () {
      console.log( 'index onHide' );
    } ,
    onUnload () {
      console.log( 'index onUnload' );

      this.initdata();
    }
  }
</script>

<style src="./index.css"
       scoped>
</style>
