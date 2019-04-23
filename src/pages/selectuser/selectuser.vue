<!--
作者:chenghao
功能:vue页
-->

<!--
用户选择
 -->
<template>

  <div>
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
    <van-button size="large"
                type="primary"
                @click="selectuser">确定选择
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

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  export default {
    name : "selectuser" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    //数据模型
    data () {
      return {
        userlist : [] ,

        selectval : [] ,

        maxmancounts : 2
      }
    } ,
    //方法
    methods : {
      selectuser () {
        if ( this.selectval == null || this.selectval.length <= 0 ) {
          Toast.fail( '请一个或2个求助对象' );

          return;
        }

      } ,
      backpage () {
        wx.navigateBack()
      } ,
      getuserlist () {
        userapi.getuserlist( this.getloginuserid ).then( ( res ) => {
          // console.log( res )
          this.userlist = res;
        } )
      } ,
      cellclick ( ee ) {
        let val = ee.mp.currentTarget.dataset.name;

        let index = this.selectval.indexOf( val );

        if ( index <= -1 ) {
          //不存在就添加进去
          this.selectval.push( val )
        }
        else {
          //之前存在 现在把它干了
          this.selectval.splice( index , 1 );
        }
      } ,
      // onChange ( ev ) {
      //   console.log( ev )
      //
      //   this.selectval = ev.mp.detail;
      // } ,
    } ,
    //计算属性
    computed : {
      // getuserid () {
      //   return this.$store.getters.getuserid;
      // } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'selectuser mouted' )

      //console.log( this.getloginuserid )
      this.getuserlist();

    } ,
    onLoad () {
      console.log( 'selectuser onLoad' )
    } ,
    onShow () {

      console.log( 'selectuser onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./selectuser.css">

</style>
