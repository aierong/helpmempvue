<!--
作者:chenghao
Date: 2019/5/3
Time: 20:39
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="csexpectdate"
               label="期望交期"
               disabled
               required
               placeholder="请选择交期"
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselectdate">选择
      </van-button>
    </van-field>
    <van-field :value="comment"
               label="备注"
               clearable
               @change="commentChange"
               placeholder="请输入求助备注"/>
    <mybr/>
    <van-button size="large"
                type="primary"
                @click="savedata">再求助
    </van-button>

    <van-button size="large"
                @click="backpage">返回
    </van-button>
    <mybr/>
    <detaildata :userselectproductno="userselectproductno"></detaildata>

    <!--    放最后，一个提示-->
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

  import detaildata from '@/components/detaildata/index.vue'
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'
  import * as constant from '@/common/constant.js'

  import mybr from '@/components/mybr.vue'

  import { loginuserdatamix } from '@/mixin/loginuserdata.js'

  import { logruntype } from '@/common/constant.js';

  import dayjs from 'dayjs'

  export default {
    name : "againhelpdata" ,
    //导入混入对象 可以是多个,数组
    mixins : [ loginuserdatamix ] ,
    components : {
      detaildata ,
      mybr
    } ,
    //数据模型
    data () {
      return {
        //CJ424205635
        userselectproductno : '' ,

        datelist : [] ,

        csexpectdate : '' ,
        comment : '' ,
        // csexpectdate : '' ,
        objectId : ''
      }
    } ,
    //方法
    methods : {
      onselectdate () {

        wx.showActionSheet( {
          //按钮的文字数组，数组长度最大为 6 个,
          itemList : this.datelist ,
          //按钮的文字颜色
          itemColor : '#000000' ,
          success : ( res ) => {
            //tapIndex就是用户点击的按钮序号,从上到下的顺序,从0开始
            let selectval = this.datelist[ res.tapIndex ];

            console.log( selectval )

            this.csexpectdate = selectval;
          }
        } );
      } ,
      getdatelist () {
        this.datelist = utils.getdatelist( true , 6 , constant.DateFormatStringYMD , false )

        console.log( 'this.datelist' , this.datelist )
      } ,
      commentChange ( event ) {
        let vals = event.mp.detail;

        this.comment = vals;
      } ,
      async savedata () {
        let now = new Date();
        let nowstr = dayjs( now ).format( constant.DateFormatString );

        let userid = this.getloginuserid;
        let username = this.getloginusername;

        // console.log( this.objectId )
        // console.log( this.getloginuserid )
        // console.log( this.getloginusername )

        if ( this.pmsreplydate ) {

        }
        else {
          Toast.fail( '复期请选择' );

          return;
        }

        //构建日志数据
        let objlog = {
          logruntype : logruntype.reply ,
          userid : userid ,
          username : username ,
          productno : this.userselectproductno ,
          dates : nowstr ,
          comment : this.addpmcreplycomment
        };

        //开始保存吧
        Toast.loading( {
          duration : 0 ,
          //forbidClick	是否禁止背景点击
          forbidClick : true ,
          loadingType : 'spinner' ,
          message : '保存中...'
        } );

        var result = await Promise.all( [
          dlapi.reply( this.objectId ,
            userid ,
            username ,
            this.pmsreplydate ,
            nowstr ,
            this.addpmcreplycomment ) ,
          dllogapi.adddllog( objlog ) ,
          utils.runlongtims( 3000 )
        ] )

        Toast.clear();

        // console.log( result )
        if ( result != null ) {
          Toast.success( '成功' );
        }

        //返回
        this.backpage();
      } ,
      backpage () {
        wx.switchTab( { url : "../reply/main" } );
      } ,
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
      console.log( 'againhelpdata mouted' , this.userselectproductno )

    } ,
    onLoad () {
      console.log( 'againhelpdata onLoad' , this.userselectproductno )

    } ,
    onShow () {

      console.log( 'againhelpdata onShow' );

      //日期段 取回来
      this.getdatelist();

      this.userselectproductno = this.$mp.query.productno

      this.objectId = this.$mp.query.objectId

      console.log( 'againhelpdata onShow' , this.userselectproductno );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./againhelpdata.css">
</style>
