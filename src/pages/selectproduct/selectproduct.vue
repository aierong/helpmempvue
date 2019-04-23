<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <!--    desc="描述信息" -->
    <van-panel :key="index"
               v-for="(item,index) in productlist"
               :title="'工程单:'+item.productno"
               :status="'客户:'+item.custno"
               use-footer-slot>
      <view>
        {{ '订单:' + item.pono }}
      </view>
      <view>
        {{ '产品:' + item.itemno + '(' + item.itemsname +')' }}
      </view>
      <!--
      加个样式把按钮搞右边去
      -->
      <view style="text-align: right;"
            slot="footer">
        <van-button @click="selectdata"
                    size="small">选择
        </van-button>

      </view>
    </van-panel>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import * as dlapi from '@/common/BmobApi/dl.js'

  export default {
    name : "selectproduct" ,
    //数据模型
    data () {
      return {
        productlist : []
      }
    } ,
    //方法
    methods : {
      getproductlist () {
        let counts = 5;
        this.productlist = dlapi.getproductlist( counts )

        console.log( this.productlist )
      } ,
      selectdata () {

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
      console.log( 'selectproduct mouted' )

      this.getproductlist();
    } ,
    onLoad () {
      console.log( 'selectproduct onLoad' )
    } ,
    onShow () {

      console.log( 'selectproduct onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style src="./selectproduct.css"
       scoped>

</style>
