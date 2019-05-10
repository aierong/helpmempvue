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


    <!--
    use-slot	是否使用自定义内容的插槽
    close 关闭弹窗
    -->
    <van-dialog use-slot
                :show="showdialog"
                show-cancel-button
                @close="onCloseDialog">
      <!--      <view>dd</view> @change="onChange2"-->
      <van-radio-group :value="radioval1"
      >
        <van-cell-group>
          <van-cell title="我求助的单据"
                    clickable
                    data-name="myhelp"
                    @click="onClickCell">
            <van-radio name="myhelp"/>
          </van-cell>
          <van-cell title="求助我的单据"
                    clickable
                    data-name="helpmy"
                    @click="onClickCell">
            <van-radio name="helpmy"/>
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
      }
    } ,
    //方法
    methods : {
      onClickCell ( ee ) {
        // ee.mp.currentTarget.dataset.name 可以取到  van-cell 中设置的 data-name="v2"
        let val = ee.mp.currentTarget.dataset.name;

        // console.log( val )

        let obj = this.$store.state.userselectquery;
        obj.querytype = val;

        this.$store.dispatch( 'UpdateUserSelectQuery' , obj );

      } ,
      onCloseDialog ( event ) {

        if ( event.mp.detail === 'confirm' ) {
          //点击了 确定按钮
          // console.log( '点击确定' )

          //把选择的状态写入vuex

          //重新查询数据
        }
        else {
          //点击了 取消按钮
          // console.log( '点击取消' )
        }

        this.showdialog = false;
      } ,
      onselecttype () {
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
      radioval1 () {
        return this.userselectquery.querytype;
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
          else if ( this.userselectquery.overtype == 'all' ) {
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
