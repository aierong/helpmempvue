<!--
作者:chenghao
Date: 2019/4/27
Time: 21:32
功能:
-->

<!-- html代码片段 -->
<template>

  <div>
    <!--    <van-button size="large" type="warning" plain -->
    <!--                @click="dj"-->
    <!--    >返回123-->
    <!--    </van-button>-->

    <!--    <button>1putong</button>-->

    <van-collapse :value="activeNames"
                  @change="onActiveChange">
      <van-collapse-item title="单据基本属性"
                         name="1">
        <van-panel v-if="userselectproductdetaildata"
                   :title="'工单:'+userselectproductdetaildata.productno"
                   :status="'填单:'+userselectproductdetaildata.username"
                   use-footer-slot>
          <view class="txt">
            {{ '订单:' + userselectproductdetaildata.pono +' 数量:' + userselectproductdetaildata.poqty +' 客户:'+userselectproductdetaildata.custno }}
          </view>
          <view class="txt">
            {{ '产品:' + userselectproductdetaildata.itemno + '(' + userselectproductdetaildata.itemsname +')' }}
          </view>
          <van-row>
            <van-col span="14">
              <span>{{  '求助对象:'+userselectproductdetaildata.helppmcname1 + (userselectproductdetaildata.helppmcname2? ('/'+userselectproductdetaildata.helppmcname2) :'') }}</span>
            </van-col>

            <van-col style="text-align: right;"
                     span="10">

              <span>{{ '求助次数:' + userselectproductdetaildata.helptimes }}</span>
            </van-col>
          </van-row>
          <view class="txt">

            {{ '复期:' + userselectproductdetaildata.pmsreplydate }}
          </view>


        </van-panel>
      </van-collapse-item>

      <van-collapse-item title="操作日志时光轴"
                         name="2">
        <van-steps :steps="stepdata"
                   :active="activesteps"
                   direction="vertical"
                   active-color="#f44"/>
      </van-collapse-item>

    </van-collapse>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  export default {
    name : "index" ,
    props : {
      stepdata : {
        type : Array ,
        default : []
      } ,
      activesteps : {
        type : Number ,
        default : 0
      } ,
      userselectproductdetaildata : {
        type : Object ,
        default : null
      } ,
    } ,
    //数据模型
    data () {
      return {
        activeNames : [ "1" , "2" ] ,
      }
    } ,
    //方法
    methods : {
      dj () {
        //代码搞这里
        console.log( 'dj' )
      } ,

    } ,
    //计算属性
    computed : {
      //name() {
      //代码搞这里
      //return this.data;
      //}
    } ,

  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./index.css">
</style>
