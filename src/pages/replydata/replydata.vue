<!--
作者:chenghao
Date: 2019/4/27
Time: 22:55
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="csexpectdate"
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
    <mybr/>
    <van-button size="large"
                type="primary"
                @click="savedata">答复复期
    </van-button>

    <van-button size="large"

                @click="backpage">返回
    </van-button>
    <mybr/>
    <detaildata :userselectproductno="userselectproductno"></detaildata>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import detaildata from '@/components/detaildata/index.vue'
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'
  import mybr from '@/components/mybr.vue'

  export default {
    name : "replydata" ,
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

        pmsreplydate : '' ,
        addpmcreplycomment : '' ,
        csexpectdate : '' ,
        objectId : ''
      }
    } ,
    //方法
    methods : {

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

            that.csexpectdate = selectval;
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
      } ,
      savedata () {

      } ,
      backpage () {

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
      console.log( 'replydata mouted' , this.userselectproductno )

    } ,
    onLoad () {
      console.log( 'replydata onLoad' , this.userselectproductno )

    } ,
    onShow () {

      console.log( 'replydata onShow' );

      //日期段 取回来
      this.getdatelist();

      this.userselectproductno = this.$mp.query.productno
      this.csexpectdate = this.$mp.query.csexpectdate

      this.objectId = this.$mp.query.objectId

      console.log( 'replydata onShow' , this.userselectproductno );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./replydata.css">
</style>
