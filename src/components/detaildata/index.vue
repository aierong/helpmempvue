<!--
作者:chenghao
Date: 2019/4/27
Time: 21:32
功能:
-->

<!-- html代码片段 -->
<template>

  <div>

    <!--    use-footer-slot-->
    <van-collapse :value="activeNames"
                  @change="onActiveChange">
      <van-collapse-item title="单据基本属性"
                         name="a">
        <van-panel v-if="userselectproductdetaildata"
                   :title="'工单:'+userselectproductdetaildata.productno"
                   :status="'填单人:'+userselectproductdetaildata.username">
          <van-row>
            <van-col span="14">
              <span>{{  '订单/数量:'+userselectproductdetaildata.pono +'/'+userselectproductdetaildata.poqty }}</span>
            </van-col>

            <van-col span="10">
              <span>{{  '客户:'+userselectproductdetaildata.custno  }}</span>

            </van-col>
          </van-row>
          <van-row>
            <van-col span="14">
              <span>{{  '产品:'+userselectproductdetaildata.itemsname   }}</span>
            </van-col>

            <van-col span="10">
              <span>{{  '料号:'+userselectproductdetaildata.itemno  }}</span>

            </van-col>
          </van-row>
          <van-row>
            <van-col span="14">
              <span>{{  '求助对象:' +userselectproductdetaildata.helppmcname1 + (userselectproductdetaildata.helppmcname2? ('/'+userselectproductdetaildata.helppmcname2) :'')   }}</span>
            </van-col>

            <van-col span="10">
              <span>{{  '求助次数:'+userselectproductdetaildata.helptimes  }}</span>

            </van-col>
          </van-row>

          <van-row>
            <van-col span="24">
              <span>{{  '最后求助时间:' +userselectproductdetaildata.helplasttime   }}</span>
            </van-col>


          </van-row>

          <van-row>

            <van-col span="24">
              <span>{{  '期望交期:'+userselectproductdetaildata.csexpectdate  }}</span>

            </van-col>
          </van-row>

          <van-row>
            <van-col span="24">
              <span>{{  '求助备注:' +userselectproductdetaildata.comment   }}</span>
            </van-col>

          </van-row>
          <van-row>
            <van-col span="14">
              <span>{{  '答复复期:' +userselectproductdetaildata.pmsreplydate   }}</span>
            </van-col>

            <van-col span="10">
              <span>{{  '答复人:'+userselectproductdetaildata.addpmcmanname  }}</span>

            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <span>{{  '答复时间:' +userselectproductdetaildata.addpmcreplydate   }}</span>
            </van-col>

          </van-row>

          <van-row>
            <van-col span="24">
              <span>{{  '答复备注:' +userselectproductdetaildata.addpmcreplycomment   }}</span>
            </van-col>

          </van-row>
          <van-row>
            <van-col span="14">
              <span>{{  '完成时间:' +userselectproductdetaildata.overdate   }}</span>
            </van-col>

            <van-col span="10">
              <span>{{  '完成状态:'+( userselectproductdetaildata.isover?'已完成':'未完成' ) }}</span>
            </van-col>
          </van-row>

        </van-panel>
      </van-collapse-item>

      <van-collapse-item title="操作日志时光轴"
                         name="b">
        <van-steps v-if="activesteps>0"
                   :steps="stepdata"
                   :active="activesteps"
                   direction="vertical"
                   active-color="#f44"/>
      </van-collapse-item>
    </van-collapse>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'
  import * as utils from '@/common/utils.js'

  export default {
    name : "index" ,
    props : {

      userselectproductno : {
        type : String ,
        default : ''
      }
    } ,
    //数据模型
    data () {
      return {
        userselectproductdetaildata : null ,

        activeNames : [ "a" , "b" ] ,

        activesteps : 0 ,
        stepdata : [] ,
      }
    } ,
    //侦听器
    watch : {
      userselectproductno : {
        handler ( newName , oldName ) {
          console.log( 'newName' , newName )
          console.log( 'oldName' , oldName )

          this.getstepdata( newName );
          this.getdetaildata( newName );
        } ,
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        //这里如果不设置immediate = true,那么最初绑定的时候是不会执行的，要等到firstName改变时才执行监听计算
        immediate : true
      }
    } ,
    //方法
    methods : {
      /**
       * 得时光轴数据
       */
      getstepdata () {
        dllogapi.getloglistbyproductno( this.userselectproductno ).then( ( res ) => {

          this.stepdata = []
          this.activesteps = 0;

          if ( res != null && res.length > 0 ) {
            for ( let item of res ) {
              let _desc = '操作:'
                + utils.getlogruntypedesc( item.logruntype )
                + '   '
                + ( ( item.logruntype == 'add' || item.logruntype == 'againhelp' ) ? '交期:' : '复期:' ) + item.dates;

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
      /**
       * 得单据详细数据
       */
      getdetaildata () {
        dlapi.getproductbyproductno( this.userselectproductno ).then( ( res ) => {
          // console.log( 'getdetaildata res' , res )

          if ( res != null ) {
            this.userselectproductdetaildata = res;
          }
          else {
            this.userselectproductdetaildata = null;
          }

        } )
      } ,
      onActiveChange ( event ) {
        //由于 :value="activeNames" 不是双向数据绑定 这里我们要主动赋值一下
        this.activeNames = event.mp.detail;
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

      console.log( '组件index mouted' , this.userselectproductno )

    } ,
    onLoad () {

      console.log( '组件index onLoad ' , this.userselectproductno )

    } ,
    onShow () {

      console.log( '组件index onShow' , this.userselectproductno )

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./index.css">
</style>
