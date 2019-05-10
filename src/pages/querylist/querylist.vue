<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="userselectquerydisplay"
               label="查询条件:"
               disabled
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselecttype">切换类型
      </van-button>
    </van-field>
    <van-search :value="SearchVal"
                placeholder="请输入工程单搜索"
                show-action
                @search="onSearch"
                @cancel="onSearchCancel"/>


    <van-dialog use-slot
                :show="showdialog"
                show-cancel-button
                @close="onCloseDialog">
      <view class="dlgtitle">单据类型</view>
      <van-radio-group :value="radioqueryval">
        <van-cell-group>
          <van-cell title="我求助的单据"
                    clickable
                    data-name="myhelp"
                    @click="onClickCellQuery">
            <van-radio name="myhelp"/>
          </van-cell>
          <van-cell title="求助我的单据"
                    clickable
                    data-name="helpmy"
                    @click="onClickCellQuery">
            <van-radio name="helpmy"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <view class="dlgtitle">单据完成类型</view>
      <van-radio-group :value="radiooverval">
        <van-cell-group>
          <van-cell title="全部"
                    clickable
                    data-name="all"
                    @click="onClickCellOver">
            <van-radio name="all"/>
          </van-cell>
          <van-cell title="未完成"
                    clickable
                    data-name="notover"
                    @click="onClickCellOver">
            <van-radio name="notover"/>
          </van-cell>
          <van-cell title="已完成"
                    clickable
                    data-name="over"
                    @click="onClickCellOver">
            <van-radio name="over"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!--
注意要配一个van-dialog,才会显示提示 ,默认id van-dialog
-->
    <van-dialog id="van-dialog"/>

  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  export default {
    name : "querylist" ,

    //数据模型
    data () {
      return {
        showdialog : false ,

        SearchVal : '' ,
        productlist : [] ,

        runuserselectquery : {
          querytype : '' ,
          overtype : ''
        }
      }
    } ,
    //方法
    methods : {
      onClickCellQuery ( ee ) {
        // ee.mp.currentTarget.dataset.name 可以取到  van-cell 中设置的 data-name="v2"
        let val = ee.mp.currentTarget.dataset.name;

        console.log( val )

        // let obj = this.$store.state.userselectquery;
        // obj.querytype = val;

        this.$store.dispatch( 'UpdateUserSelectQueryType' , val );

      } ,
      onClickCellOver ( ee ) {
        let val = ee.mp.currentTarget.dataset.name;

        console.log( val )

        // let obj = this.$store.state.userselectquery;
        // obj.overtype = val;
        // console.log( obj )
        this.$store.dispatch( 'UpdateUserSelectOverType' , val );

      } ,
      onCloseDialog ( event ) {

        if ( event.mp.detail === 'confirm' ) {
          //点击了 确定按钮
          // console.log( '点击确定' )

          //重新查询数据
        }
        else {
          //点击了 取消按钮
          // console.log( '点击取消' )
        }

        //不管点确定 还是取消都要 运行
        if ( this.userselectquery.overtype == this.runuserselectquery.overtype
          && this.userselectquery.querytype == this.runuserselectquery.querytype ) {
          //没有变化，不搞了
        }
        else {
          //发生了变化

          //刷新列表
        }

        this.showdialog = false;
      } ,
      onselecttype () {
        // this.runuserselectquery.isvalid = false;
        this.runuserselectquery.overtype = this.userselectquery.overtype;
        this.runuserselectquery.querytype = this.userselectquery.querytype;

        this.showdialog = true;

        // this.$store.dispatch( 'UpdateUserSelectQueryType' , _data );

      } ,
      onSearch ( event ) {
        //要搜索的值
        let val = event.mp.detail;

        // 最好 把模型同步一下
        this.SearchVal = val;
      } ,
      onSearchCancel () {
        this.SearchVal = "";
      } ,
    } ,
    //计算属性
    computed : {
      radioqueryval () {
        return this.userselectquery.querytype;
      } ,
      radiooverval () {
        return this.userselectquery.overtype;
      } ,
      userselectquery () {
        return this.$store.state.userselectquery;

      } ,
      userselectquerydisplay () {
        var result = "";

        if ( this.userselectquery != null ) {
          if ( this.userselectquery.querytype == 'myhelp' ) {
            result = "我求助的单据";
          }
          else {
            result = "求助我的单据"
          }

          if ( this.userselectquery.overtype == 'all' ) {
            result = result + "(" + '全部' + ')';
          }
          else if ( this.userselectquery.overtype == 'notover' ) {
            result = result + "(" + '未完成' + ')';
          }
          else {
            result = result + "(" + '已完成' + ')';
          }

          return result
        }
        else {
          return result
        }
      } ,
      /**
       * 列表数量
       * @returns {number}
       */
      listcount () {
        if ( this.productlist != null && this.productlist.length > 0 ) {
          return this.productlist.length;
        }

        /**
         *作者:  chenghao
         *Date: 2019/4/25
         *Time: 14:28
         *功能: 没有就默认返回0

         */

        return 0;
      } ,
    } ,
    //生命周期(mounted)
    mounted () {
      console.log( 'querylist mouted' )
    } ,
    onLoad () {
      console.log( 'querylist onLoad' )
    } ,
    onShow () {

      console.log( 'querylist onShow' );
    } ,
    onHide () {
      console.log( 'querylist onHide' );
    } ,
    onUnload () {
      console.log( 'querylist onUnload' );

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./querylist.css">
</style>
