<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <div style="color: green;margin-left: 10px;font-size: large;">常用功能</div>
    <van-row class="user-links">
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="helpclick"
                  name="friends-o"
                  size="36px"/>
        <br>填求助
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="replyclick"
                  name="comment-o"
                  :info="myreplycount"
                  size="36px"/>
        <br>待答复
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="againhelplick"
                  name="smile-comment-o"
                  size="36px"/>
        <br>再求助
      </van-col>

    </van-row>
    <mybr/>
    <van-row class="user-links">
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="queryclick"
                  name="search"
                  size="36px"/>
        <br>查询
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="FXclick"
                  name="flower-o"
                  size="36px"/>
        <br>分享
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="exitclick"
                  name="exchange"
                  size="36px"/>
        <br>退出
      </van-col>
    </van-row>
    <mybr/>
    <div style="color: green;margin-left: 10px;font-size: large;">我的数据</div>


    <mybr/>
    <van-row class="user-links">
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="itemtabbarclick(1)"
                  name="user-o"
                  color="green"
                  :info="mycount"
                  size="36px"/>
        <br>我求助
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="itemtabbarclick(2)"
                  name="user-o"
                  color="green"
                  :info="mycountover"
                  size="36px"/>
        <br>我求助(完成)
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="itemtabbarclick(3)"
                  name="user-o"
                  color="green"
                  :info="mycountnotover"
                  size="36px"/>
        <br>我求助(未完)
      </van-col>

    </van-row>
    <mybr/>
    <van-row class="user-links">
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="itemtabbarclick(4)"
                  name="smile-o"
                  color="green"
                  :info="helpmecount"
                  size="36px"/>
        <br>求助我
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="itemtabbarclick(5)"
                  name="smile-o"
                  color="green"
                  :info="helpmecountover"
                  size="36px"/>
        <br>求助我(完成)
      </van-col>
      <van-col custom-class="dark"
               span="8">
        <van-icon @click="itemtabbarclick(6)"
                  name="smile-o"
                  color="green"
                  :info="helpmecountnotover"
                  size="36px"/>
        <br>求助我(未完)
      </van-col>
    </van-row>
    <mybr/>

    <van-action-sheet :show="showaction"
                      :actions="actionslist"
                      @cancel="oncancel"
                      cancel-text="取消"
                      @select="onSelectitem"/>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as constant from '@/common/constant.js'

  import * as dlapi from '@/common/BmobApi/dl.js'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import { mixmethods } from '@/mixin/commonmethods.js'

  import mybr from '@/components/mybr.vue'

  export default {
    name : "me" ,
    components : {
      mybr
    } ,
    //导入混入对象 可以是多个,数组
    mixins : [
      loginuserdatamix ,
      mixmethods
    ] ,
    //下拉刷新
    onPullDownRefresh () {

      this.getcounts( this.getloginuserid )

      wx.stopPullDownRefresh()
    } ,
    //分享
    onShareAppMessage () {
      return {
        title : '填单帮助我' ,
        path : '/pages/index/main' ,
        imageUrl : '/static/img/logo.png'
      }
    } ,
    //数据模型
    data () {
      return {
        actionslist : [
          {
            name : '分享' ,
            subname : '分享给好友' ,
            openType : 'share'
          } ,
        ] ,
        showaction : false ,

        //我求助的单据数量 (所有的)
        mycount : 0 ,
        //我求助的单据数量 (完成的)
        mycountover : 0 ,
        //mycountnotover : 0 ,

        //求助我的单据数量 (所有的)
        helpmecount : 0 ,
        //求助我的单据数量 (完成的)
        helpmecountover : 0 ,
        //helpmecountnotover : 0 ,

        myreplycount : 0
      }
    } ,
    //方法
    methods : {
      itemtabbarclick ( index ) {

        if ( index >= 4 ) {
          this.gotoreply();
        }
        else {
          if ( index == 1 ) {
            // this.$store.dispatch( 'UpdateUserSelectQueryType' , 'myhelp' );
            // this.$store.dispatch( 'UpdateUserSelectOverType' , 'all' );
            this.UpdateUserSelectQueryTypeAndOverType( 'myhelp' , 'all' );

            this.gotolist();
          }
          else if ( index == 2 ) {

            // this.$store.dispatch( 'UpdateUserSelectQueryType' , 'myhelp' );
            // this.$store.dispatch( 'UpdateUserSelectOverType' , 'over' );

            this.UpdateUserSelectQueryTypeAndOverType( 'myhelp' , 'over' );

            this.gotolist();
          }
          else if ( index == 3 ) {

            // this.$store.dispatch( 'UpdateUserSelectQueryType' , 'myhelp' );
            // this.$store.dispatch( 'UpdateUserSelectOverType' , 'notover' );

            this.UpdateUserSelectQueryTypeAndOverType( 'myhelp' , 'notover' );

            this.gotolist();
          }
        }
      } ,
      //退出系统
      ExitSystem () {

        //清除本地存储
        wx.removeStorageSync( constant.StorageName )

        //分发 action 修改状态
        this.$store.dispatch( 'SetupUser' , null )

        //转向 登录页面
        const url = "../index/main"
        // wx.navigateTo( { url : url } )

        wx.reLaunch( { url : url } );
      } ,

      helpclick () {

        wx.switchTab( { url : "../helpmeadd/main" } );
      } ,
      replyclick () {

        this.gotoreply();
      } ,
      /**
       * 转向待答复页面
       */
      gotoreply () {
        wx.switchTab( { url : "../reply/main" } );
      } ,
      queryclick () {
        // this.$store.dispatch( 'UpdateUserSelectQueryType' , 'myhelp' );
        // this.$store.dispatch( 'UpdateUserSelectOverType' , 'all' );

        this.UpdateUserSelectQueryTypeAndOverType( 'myhelp' , 'all' );


        this.gotolist();
      } ,
      /**
       * 查询页面
       */
      gotolist () {

        wx.switchTab( { url : "../querylist/main" } );
      } ,
      againhelplick () {
        wx.switchTab( { url : "../againhelp/main" } );
      } ,
      FXclick () {
        this.showaction = true;
      } ,
      oncancel () {
        this.showaction = false;
      } ,
      onSelectitem ( event ) {

        this.showaction = false;

      } ,
      exitclick () {
        //弹窗提示一下

        wx.showModal( {
          title : '提示' ,
          content : '确定退出吗?' ,
          success : ( res ) => {
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

      async getcounts ( userid ) {
        var result = await Promise.all( [
          dlapi.getmycount( userid , 2 ) ,
          dlapi.getmycount( userid , 1 ) ,
          dlapi.gethelpmecount( userid , 2 ) ,
          dlapi.gethelpmecount( userid , 1 ) ,
          dlapi.getmyreplycount( userid )
        ] )

        // console.log( result )
        if ( result != null && result.length >= 5 ) {
          this.mycount = result[ 0 ];
          this.mycountover = result[ 1 ];

          this.helpmecount = result[ 2 ];
          this.helpmecountover = result[ 3 ];

          this.myreplycount = result[ 4 ];
        }
      } ,
    } ,
    //计算属性
    computed : {
      //我求助的单据数量 (未完成的)
      mycountnotover () {
        // 全部减去完成的
        return this.mycount - this.mycountover;
      } ,
      //求助我的单据数量 (未完成的)
      helpmecountnotover () {
        // 全部减去完成的
        return this.helpmecount - this.helpmecountover;
      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'me mouted' )

    } ,
    beforeCreate () {
      console.log( 'me beforeCreate' )
    } ,
    created () {
      console.log( 'me created' )
    } ,
    onLoad () {
      console.log( 'me onLoad' )

      let _title = this.getloginusername + '主页';
      this.setuppagetitle( _title );

      this.getcounts( this.getloginuserid )
    } ,
    onReady () {
      console.log( 'me onReady' )
    } ,
    onShow () {

      console.log( 'me onShow' );

    } ,
    onHide () {
      console.log( 'me onHide' );
    } ,
    onUnload () {
      console.log( 'me onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./me.css">
</style>
