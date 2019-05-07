<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>

  <div>
    <van-field :value="userselectquerytypename"
               label="查询类型"
               disabled
               use-button-slot>
      <van-button slot="button"
                  size="mini"
                  type="primary"
                  @click="onselecttype">切换类型
      </van-button>
    </van-field>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>


  export default {
    name : "querylist" ,

    //数据模型
    data () {
      return {
        msg : ''
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

    } ,
    //计算属性
    computed : {
      userselectquerytype () {
        return this.$store.state.userselectquerytype;

      } ,
      userselectquerytypename () {
        if ( this.userselectquerytype == 'myhelp' ) {
          return '我求助的单据'
        }
        else {
          return '求助我的单据'
        }
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
