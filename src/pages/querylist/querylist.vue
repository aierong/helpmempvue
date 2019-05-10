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
  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  export default {
    name : "querylist" ,

    //数据模型
    data () {
      return {
        SearchVal : '' ,
        productlist : [] ,
      }
    } ,
    //方法
    methods : {
      onselecttype () {
        let _data = 'myhelp';

        if ( this.userselectquerytype == 'myhelp' ) {
          _data = 'helpme'
        }

        this.$store.dispatch( 'UpdateUserSelectQueryType' , _data );

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
