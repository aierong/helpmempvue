<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <!--    <van-field :value="productno"-->
    <!--               label="工程单"-->
    <!--               required-->
    <!--               placeholder="请输入工程单"/>-->

    <!--
    disabled 禁止输入
    -->
    <van-field :value="productinfo.productno"
               center
               clearable
               label="工程单"
               disabled
               placeholder="请选择工程单"
               use-button-slot>
      <van-button slot="button"
                  size="small"
                  type="primary"
                  @click="onselectproduct">选择
      </van-button>
    </van-field>
    <van-field :value="productinfo.custno"
               label="客户编号"
               disabled/>
    <van-field :value="productinfo.pono"
               label="订单号"
               disabled/>
    <van-field :value="productinfo.poqty"
               label="数量"
               disabled/>
    <van-field :value="productinfo.itemno"
               label="料号"
               disabled/>
    <van-field :value="productinfo.itemsname"
               label="物料名称"
               disabled/>
    <van-field :value="csexpectdate"
               label="期望交期"
               disabled
               placeholder="请选择期望交期"
               use-button-slot>
      <van-button slot="button"
                  size="small"
                  type="primary"
                  @click="onselectdate">选择
      </van-button>
    </van-field>

    <!--    放最后，一个弹窗-->
    <van-popup :show="isshowdatepicker"
               position="bottom">

      <van-datetime-picker type="date"
                           :value="currentDate"
                           :min-date="minDate"
                           @confirm="userselectdate"
                           @cancel="userselectdatecancel"/>
    </van-popup>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import dayjs from 'dayjs'

  export default {
    name : "helpmeadd" ,
    //数据模型
    data () {
      return {
        isshowdatepicker : false ,
        currentDate : new Date().getTime() ,
        minDate : new Date().getTime() ,

        csexpectdate : ''
      }
    } ,
    //方法
    methods : {
      onselectproduct () {
        //代码搞这里
        //转向  产品选择页面
        const url = "../selectproduct/main"
        wx.navigateTo( { url : url } )
      } ,
      onselectdate () {
        this.isshowdatepicker = true;
      } ,
      userselectdate ( event ) {
        const { detail } = event.mp;

        // console.log( detail )
        // console.log( currentTarget )

        let selectdate = new Date( detail );  //得到日期
        let _now2 = dayjs( selectdate );
        this.csexpectdate = _now2.format( 'YYYY-MM-DD' )
      } ,
      userselectdatecancel () {
        this.isshowdatepicker = false;
      } ,
    } ,
    //计算属性
    computed : {
      productinfo () {
        return this.$store.state.userselectproductdata;

      }
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'helpmeadd mouted' )
    } ,
    onLoad () {
      console.log( 'helpmeadd onLoad' )
    } ,
    onShow () {

      console.log( 'helpmeadd onShow' );
    }
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./helpmeadd.css">
</style>
