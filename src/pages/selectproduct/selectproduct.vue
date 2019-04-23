<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-search :value="SearchVal"
                placeholder="请输入工程单搜索关键词"
                show-action
                @search="onSearch"
                @cancel="onCancel"/>

    <!--
    desc="描述信息"
    :title="'工程单:'+item.productno"
    -->
    <van-panel :key="index"
               v-for="(item,index) in SearchProductList"
               :title="(index+1)+ '.工单:'+item.productno"
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
        <van-button plain
                    type="primary"
                    @click="selectdata(item)"
                    size="mini">选择
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
        maxcounts : 20 ,

        productlist : [] ,

        SearchVal : ''
      }
    } ,
    //方法
    methods : {
      backpage () {
        wx.navigateBack()
      } ,

      onSearch ( event ) {
        //要搜索的值
        let val = event.mp.detail;

        // 最好 把模型同步一下
        this.SearchVal = val;
      } ,
      onCancel ( event ) {
        this.SearchVal = "";
      } ,
      getproductlist () {
        // let counts = 10;
        this.productlist = dlapi.getproductlist( this.maxcounts )

        console.log( this.productlist )
      } ,
      selectdata ( item ) {
        //逻辑说明: 把数据存储在 vuex，并且返回

        let obj = {
          productno : item.productno ,
          custno : item.custno ,
          pono : item.pono ,

          itemno : item.itemno ,
          itemsname : item.itemsname ,
          poqty : item.poqty

        };

        this.$store.dispatch( 'SetupUserSelectProductData' , obj );

        this.backpage();
      } ,
    } ,
    //计算属性
    computed : {
      SearchProductList () {
        if ( this.SearchVal ) {
          if ( this.productlist != null && this.productlist.length > 0 ) {
            let result = this.productlist.filter( ( value , index , array ) => {
              let _productno = value.productno;
              if ( _productno ) {
                return _productno.includes( this.SearchVal ); // 返回
              }
              else {
                return false;
              }

            } );

            return result;
          }

        }

        return this.productlist;
      }
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
