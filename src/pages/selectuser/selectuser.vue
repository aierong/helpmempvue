<!--
作者:chenghao
功能:vue页
-->

<!--
用户选择
 -->
<template>

  <div>
    <!--
    checkbox-group 中刷新数据后之前选中的没有选中状态

    所以这里，暂时不用搜索功能了

    参考:
    https://github.com/youzan/vant-weapp/issues/1486
    -->
    <!--    <van-search :value="SearchVal"-->
    <!--                placeholder="请输入搜索"-->
    <!--                show-action-->
    <!--                @search="onSearch"-->
    <!--                @cancel="onSearchCancel"/>-->
    <van-checkbox-group :value="selectval">
      <van-cell-group>
        <van-cell v-for="(item,index) in userlist"
                  :key="index"
                  :data-name="item.userid"
                  @click="cellclick"
                  :title="item.userid + '(' + item.username +')' ">
          <van-checkbox :name="item.userid"/>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>

    <!--    <van-checkbox-group :value="selectval"-->
    <!--                        @change="onChangecheckbox">-->
    <!--      <van-checkbox v-for="(item,_index) in SearchUserList"-->
    <!--                    :key="_index"-->
    <!--                    :name="item.userid">-->
    <!--        {{ item.userid + '(' + item.username +')' }}-->
    <!--      </van-checkbox>-->
    <!--    </van-checkbox-group>-->

    <div v-if="usercounts>0"
         class="msgtxt">{{ '可供选择'+usercounts+'人,最多可选'+maxmancounts+'人' }}
    </div>
    <van-button v-if="usercounts>0"
                size="large"
                type="primary"
                @click="selectuser">确定选择
    </van-button>
    <van-button v-if="usercounts>0"
                size="large"
                @click="backpage">返回
    </van-button>

  </div>

</template>

<!-- js脚本代码片段 -->
<script>

  import * as userapi from '@/common/BmobApi/users.js'
  import * as utils from '@/common/utils.js'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import { mixmethods } from '@/mixin/commonmethods.js'

  export default {
    name : "selectuser" ,
    //导入混入对象 可以是多个,数组
    mixins : [
      loginuserdatamix ,
      mixmethods
    ] ,

    //数据模型
    data () {
      return {
        //待选择的用户列表
        userlist : [] ,

        //已经选择的数据
        selectval : [] ,

        maxmancounts : 2 ,

        //搜索值
        SearchVal : '' ,
      }
    } ,
    //方法
    methods : {
      initdata () {
        //清空一下，以免记录上次的
        this.selectval = [];
        this.userlist = [];
      } ,
      selectuser () {
        if ( this.selectval == null || this.userselectcounts <= 0 ) {

          this.ShowToastMsg( '请选择求助对象' )

          return;
        }

        if ( this.userselectcounts > this.maxmancounts ) {

          this.ShowToastMsg( '最多选择' + this.maxmancounts + '个求助对象' )

          return;
        }

        let obj = {
          helppmc1 : '' ,
          helppmcname1 : '' ,
          helppmc2 : '' ,
          helppmcname2 : ''
        }

        let selectdata1 = this.selectval[ 0 ];
        obj.helppmc1 = selectdata1;
        obj.helppmcname1 = this.getname( selectdata1 )

        if ( this.selectval.length <= 2 ) {
          let selectdata2 = this.selectval[ 1 ];
          obj.helppmc2 = selectdata2;
          obj.helppmcname2 = this.getname( selectdata2 )
        }

        this.$store.dispatch( 'SetupUserSelectHelpManData' , obj );

        this.backpage();
      } ,
      backpage () {

        wx.navigateBack()

      } ,
      /**
       * 得用户名称
       * @param userid
       * @returns {string|*}
       */
      getname ( userid ) {
        if ( this.userlist != null && this.userlist.length > 0 ) {
          let result = this.userlist.find( ( n ) => {
            return n.userid == userid;
          } )

          if ( result != null ) {
            return result.username;
          }
        }
        return "";
      } ,
      getuserlist () {

        // 加载动画
        wx.showLoading( {
          title : '挖数据...' ,
          mask : true , //显示透明蒙层，防止触摸穿透
        } );

        Promise.all( [
          userapi.getuserlist( this.getloginuserid ) ,
          utils.runlongtims( 1000 )
        ] ).then( ( values ) => {
          //values是数组
          this.userlist = values[ 0 ];

          //加载已经选择的
          if ( this.helpmaninfo != null ) {
            if ( this.helpmaninfo.helppmc1 ) {
              this.selectval.push( this.helpmaninfo.helppmc1 )
            }

            if ( this.helpmaninfo.helppmc2 ) {
              this.selectval.push( this.helpmaninfo.helppmc2 )
            }
          }

          // 取消加载动画
          wx.hideLoading()

          this.refreshpagetitle();
        } )

      } ,
      onChangecheckbox ( ev ) {
        console.log( ev )

        this.selectval = ev.mp.detail;
      } ,
      /*
       单击选择
       */
      cellclick ( ee ) {
        let val = ee.mp.currentTarget.dataset.name;

        // console.log( val )

        let index = this.selectval.indexOf( val );

        // console.log( index )

        if ( index <= -1 ) {
          //不存在就添加进去
          this.selectval.push( val )
        }
        else {
          //之前存在 现在把它干了
          this.selectval.splice( index , 1 );
        }

        // console.log( 'cellclick' , this.selectval )

        this.refreshpagetitle();
      } ,
      /*
       刷新页面标题
       */
      refreshpagetitle () {
        let _title = `选择用户(已选${ this.userselectcounts }人)`;

        this.setuppagetitle( _title );
      } ,
      onSearch ( event ) {
        //要搜索的值
        let val = event.mp.detail;

        //  把模型同步一下
        this.SearchVal = val;

        // console.log( 'onSearch' , this.selectval )
      } ,
      onSearchCancel () {
        this.SearchVal = "";

        // this.selectval = this.selectval;

        // console.log( 'onSearchCancel' , this.selectval )
      } ,
    } ,
    //计算属性
    computed : {
      SearchUserList () {
        if ( this.SearchVal ) {
          if ( this.userlist != null && this.userlist.length > 0 ) {

            let result = this.userlist.filter( ( value , index , array ) => {
              let _userid = value.userid;

              if ( _userid ) {
                return _userid.includes( this.SearchVal ); // 返回
              }
              else {
                return false;
              }

            } );

            return result;
          }

        }

        return this.userlist;
      } ,
      /**
       * 用户数量
       * @returns {number}
       */
      usercounts () {
        if ( this.userlist != null && this.userlist.length > 0 ) {
          return this.userlist.length;
        }

        return 0;

      } ,
      /**
       * 操作者已经选择用户数量
       */
      userselectcounts () {
        if ( this.selectval != null && this.selectval.length > 0 ) {
          return this.selectval.length;
        }

        return 0;
      } ,
      /**
       * 用户选择的人员
       * @returns {default.userselecthelpman|{helppmc2, helppmc1, helppmcname1, helppmcname2}|*|__webpack_exports__.a.userselecthelpman}
       */
      helpmaninfo () {

        return this.$store.state.userselecthelpman;

      } ,
    } ,
    //生命周期(mounted)
    mounted () {

      console.log( 'selectuser mouted' )

    } ,
    beforeCreate () {
      console.log( 'selectuser beforeCreate' )
    } ,
    created () {
      console.log( 'selectuser created' )
    } ,
    onLoad () {
      console.log( 'selectuser onLoad' )

      this.getuserlist();
    } ,
    onShow () {

      console.log( 'selectuser onShow' );
    } ,
    onReady () {
      console.log( 'selectuser onReady' )
    } ,
    onHide () {
      console.log( 'selectuser onHide' );
    } ,
    onUnload () {
      console.log( 'selectuser onUnload' );

      this.initdata();
    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./selectuser.css">
</style>
