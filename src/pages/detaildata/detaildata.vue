<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-collapse :value="activeNames"
                  @change="onActiveChange">
      <van-collapse-item title="单据基本属性"
                         name="1">
        单据基本属性
      </van-collapse-item>

      <van-collapse-item title="操作日志时光轴"
                         name="2">
        <van-steps :steps="stepdata"
                   :active="activesteps"
                   direction="vertical"
                   active-color="#f44"/>
      </van-collapse-item>

    </van-collapse>
    <mybr/>
    <van-button size="large"
                @click="backpage">返回
    </van-button>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'

  import mybr from '@/components/mybr.vue'

  export default {
    name : "detaildata" ,
    components : {
      mybr
    } ,
    //数据模型
    data () {
      return {
        userselectproductno : '' ,
        userselectproductdetaildata : {} ,

        activeNames : [ "1" , "2" ] ,
        activesteps : 0 ,
        stepdata : [] ,
        // stepdata : [
        //   {
        //     text : '步骤一' ,
        //     desc : '描述信息'
        //   } ,
        //   {
        //     text : '步骤二' ,
        //     desc : '描述信息'
        //   } ,
        //   {
        //     text : '步骤三' ,
        //     desc : '描述信息'
        //   } ,
        //   {
        //     text : '步骤四' ,
        //     desc : '描述信息'
        //   }
        // ] ,

      }
    } ,
    //方法
    methods : {
      backpage () {
        wx.navigateBack()

        // wx.switchTab( {
        //   url : "../helpmeadd/main"
        // } );
      } ,
      onActiveChange ( event ) {
        //由于 :value="activeNames" 不是双向数据绑定 这里我们要主动赋值一下
        this.activeNames = event.mp.detail;
      } ,

      /**
       * 得时光轴数据
       */
      getstepdata () {
        dllogapi.getloglistbyproductno( this.userselectproductno ).then( ( res ) => {
          // console.log( 'res' , res )

          this.stepdata = []
          this.activesteps = 0;

          if ( res != null && res.length > 0 ) {
            for ( let item of res ) {
              let _desc = '操作:' + utils.getlogruntypedesc( item.logruntype ) + '  交期/复期:' + item.dates;

              let obj = {
                text : item.createdAt + '(' + item.username + ')' ,
                desc : _desc
              }

              //把数据加入
              this.stepdata.push( obj );
            }

            this.activesteps = res.length;
          }

        } )
      } ,
      getdetaildata () {
        dlapi.getproductbyproductno( this.userselectproductno ).then( ( res ) => {
          console.log( 'res' , res )

          if ( res != null ) {
            this.userselectproductdetaildata = res;
          }
          else {
            this.userselectproductdetaildata = {};
          }

        } )
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
      console.log( 'detaildata mouted' )

      //取到前一个页面传递过来的工程单号
      this.userselectproductno = this.$mp.query.productno
      console.log( 'userselectproductno' , this.userselectproductno )
      this.getstepdata();
      this.getdetaildata();
    } ,
    onLoad () {
      console.log( 'detaildata onLoad' )
    } ,
    onShow () {

      console.log( 'detaildata onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./detaildata.css">
</style>
