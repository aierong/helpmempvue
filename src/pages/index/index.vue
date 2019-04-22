<template>
  <div>

    <button @click="djtest">bmob测试</button>

    <button @click="testdata">随机数据</button>


  </div>
</template>

<script>
  // import * as mock from '@/common/mockdata/index.js'

  export default {
    data () {
      return {
        tableName : 'wxq'
      }
    } ,

    methods : {

      // testdata () {
      //
      //   let arr = mock.gethelpproduct( 2 );
      //
      //   console.log( arr )
      //
      // } ,
      // djtest () {
      //   const query = this.$Bmob.Query( this.tableName );
      //
      //   query.equalTo( "id" , ">" , 100 );
      //   // 对num1字段升序排列
      //
      //   // 对num1字段降序排列
      //   query.order( "-num1" );
      //
      //   query.find().then( res => {
      //     //返回的是数组,没有找到就是空数组
      //
      //     console.log( res )
      //   } );
      // } ,
    } ,

    created () {
      // let app = getApp()
    }
  }
</script>

<style src="./index.css"
       scoped>
</style>
