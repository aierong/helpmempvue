<template>
  <div>

    <!--    <button @click="djtest">bmob测试</button>-->

    <!--    <button @click="testdata">随机数据</button>-->
    <van-nav-bar right-text="注册"
                 @clickright="onClickRight"/>
    <div v-if="!isvaliduser">
      11
    </div>
  </div>
</template>

<script>
  // import * as mock from '@/common/mockdata/index.js'
  import * as constant from '@/common/constant.js'

  import * as userapi from '@/common/BmobApi/users.js'

  export default {
    data () {
      return {

        isvaliduser : false ,

      }
    } ,

    methods : {
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

        let userid = "";
        let pwd = "";

        //调用 api
        // 成功 写入本地存储 写入vuex  页面跳转
        userapi.login( userid , pwd ).then( ( res ) => {
          if ( res != null && res.isok ) {
            //登录成功
            var now = new Date();
            let userobj = {
              userid : userid ,
              username : res.username ,
              logintime : now
            };
            this.setStorageValue( userobj );

            this.SaveVuexAndSwitch( userobj )
          }
          else {
            wx.showToast( {
              title : '登录失败' , //提示的内容,
              duration : 2000 , //延迟时间,
              mask : true , //显示透明蒙层，防止触摸穿透,
              success : res => {
                console.log( res )
              }
            } );
          }
        } );
      } ,
      // testdata () {
      //
      //   let arr = mock.gethelpproduct( 2 );
      //
      //   console.log( arr )
      //
      // } ,
      // djtest () {
      //   const query = this.$Bmob.Query( this.tableName );
      //
      //   query.equalTo( "id" , ">" , 100 );
      //   // 对num1字段升序排列
      //
      //   // 对num1字段降序排列
      //   query.order( "-num1" );
      //
      //   query.find().then( res => {
      //     //返回的是数组,没有找到就是空数组
      //
      //     console.log( res )
      //   } );
      // } ,
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
