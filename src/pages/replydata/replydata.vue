<!--
作者:chenghao
Date: 2019/4/27
Time: 22:55
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="pmsreplydate"
               label="复期"
               disabled
               required
               placeholder="请选择复期"
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselectdate">选择
      </van-button>
    </van-field>
    <van-field :value="addpmcreplycomment"
               label="备注"
               clearable
               @change="commentChange"
               placeholder="请输入复期备注"/>
    <detaildata :userselectproductno="userselectproductno"></detaildata>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import detaildata from '@/components/detaildata/index.vue'
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'

  export default {
    name : "replydata" ,
    components : {
      detaildata
    } ,
    //数据模型
    data () {
      return {
        //CJ424205635
        userselectproductno : '' ,

        // userselectproductdetaildata : null ,

        // activesteps : 0 ,
        // stepdata : [] ,
        datelist : [] ,

        pmsreplydate : '' ,
        addpmcreplycomment : ''
      }
    } ,
    //方法
    methods : {
      // /**
      //  * 得时光轴数据
      //  */
      // getstepdata () {
      //   dllogapi.getloglistbyproductno( this.userselectproductno ).then( ( res ) => {
      //     // console.log( 'res' , res )
      //
      //     this.stepdata = []
      //     this.activesteps = 0;
      //
      //     if ( res != null && res.length > 0 ) {
      //       for ( let item of res ) {
      //         let _desc = '操作:' + utils.getlogruntypedesc( item.logruntype ) + '  交期/复期:' + item.dates;
      //
      //         let obj = {
      //           text : item.createdAt + '(' + item.username + ')' ,
      //           desc : _desc
      //         }
      //
      //         //把数据加入
      //         this.stepdata.push( obj );
      //       }
      //
      //       this.activesteps = res.length;
      //     }
      //
      //   } )
      // } ,
      // getdetaildata () {
      //   dlapi.getproductbyproductno( this.userselectproductno ).then( ( res ) => {
      //     console.log( 'res' , res )
      //
      //     if ( res != null ) {
      //       this.userselectproductdetaildata = res;
      //     }
      //     else {
      //       this.userselectproductdetaildata = null;
      //     }
      //
      //   } )
      // } ,
      onselectdate () {
        let that = this;

        wx.showActionSheet( {
          //按钮的文字数组，数组长度最大为 6 个,
          itemList : this.datelist ,
          //按钮的文字颜色
          itemColor : '#000000' ,
          success : res => {
            //tapIndex就是用户点击的按钮序号,从上到下的顺序,从0开始
            let selectval = that.datelist[ res.tapIndex ];

            console.log( selectval )

            that.productlist[ index ].pmsreplydate = selectval;
          }
        } );
      } ,
      getdatelist () {
        this.datelist = utils.getdatelist( true , 6 , 'YYYY-MM-DD' )

        console.log( 'this.datelist' , this.datelist )
      } ,
      commentChange ( event ) {
        let vals = event.mp.detail;

        this.addpmcreplycomment = vals;
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
      console.log( 'replydata mouted' , this.userselectproductno )

      //取到前一个页面传递过来的工程单号
      // this.userselectproductno = this.$mp.query.productno
      //CJ424205635
      // this.userselectproductno = 'CJ424205635'
      // console.log( 'userselectproductno' , this.userselectproductno )
      // this.getstepdata();
      // this.getdetaildata();
    } ,
    onLoad () {
      console.log( 'replydata onLoad' , this.userselectproductno )

      // this.userselectproductno = 'CJ424205635'
      //取到前一个页面传递过来的工程单号

      // console.log( 'userselectproductno' )
      // this.getstepdata();
      // this.getdetaildata();
    } ,
    onShow () {

      // console.log( 'replydata onShow' );

      //日期段 取回来
      this.getdatelist();

      this.userselectproductno = this.$mp.query.productno

      console.log( 'replydata onShow' , this.userselectproductno );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./replydata.css">
</style>
