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

    <!--    页面主体部分 -->
    <div style="margin-bottom: 6px;"
         v-if=" listcount>0"
         v-for="(item,index) in SearchProductList"
         :key="index">

      <van-panel :title="(index+1)+ '.工单:'+item.productno"
                 :status="'客户:'+item.custno">
        <van-row>
          <van-col span="24">
            <span class="mytxt"> {{ '订单:' + item.pono +' 数量:' + item.poqty }}</span>
          </van-col>

        </van-row>
        <van-row>
          <van-col span="24">
            <span class="mytxt">{{ '产品:' + item.itemno + '(' + item.itemsname +')' }}</span>
          </van-col>

        </van-row>
        <van-row>
          <van-col span="10">
            <span class="mytxt">{{  '求助人:'+item.username  }}</span>
          </van-col>

          <van-col style="text-align: right;"
                   span="14">
            <van-button v-if="ismylist && !item.isover"
                        style="margin-bottom: 10px;margin-right: 5px;"
                        plain
                        type="info"
                        @click="overdata(item,index)"
                        size="mini">完成
            </van-button>
            <van-button v-if="ismylist && !item.isover"
                        style="margin-bottom: 10px;margin-right: 5px;"
                        plain
                        type="danger"
                        @click="deletedata(item,index)"
                        size="mini">删除
            </van-button>
            <van-button style="margin-bottom: 10px;margin-right: 10px;"
                        plain
                        type="primary"
                        hairline
                        round
                        @click="alldata(item)"
                        size="mini">详情
            </van-button>

          </van-col>
        </van-row>
      </van-panel>

    </div>
    <div v-if="isshowdowntxt"
         class="downtxt">---我是存在底线的---
    </div>
    <van-panel v-if="isshownulllisttxt">

      <view class="nulltxt">空空也,快去求助吧!</view>
    </van-panel>
    <!--    弹窗  -->
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
  import { commoncomputed } from '@/mixin/commoncomputed.js'
  import { loginuserdatamix } from '@/mixin/loginuserdata.js'
  import { mixmethods } from '@/mixin/commonmethods.js'

  import { logruntype } from '@/common/constant.js';

  import * as utils from '@/common/utils.js'
  import * as constant from '@/common/constant.js'

  import * as dlapi from '@/common/BmobApi/dl.js'
  import * as dllogapi from '@/common/BmobApi/dllog.js'

  import dayjs from 'dayjs'

  export default {
    name : "querylist" ,
    //导入混入对象 可以是多个,数组
    mixins : [
      loginuserdatamix ,
      mixmethods ,
      commoncomputed
    ] ,
    //上拉触底刷新
    onReachBottom () {

      if ( this.isshowdowntxt ) {
        //   '不用刷数据'
        return;
      }

      ;( async () => {
        //每次搞2个
        let rscount = 2;
        let arr = await this.addproductlist( rscount , true );

        // console.log( 'shang' , arr )

        if ( arr != null && arr.length > 0 ) {
          let arrlens = arr.length;

          if ( arrlens > 0 ) {
            this.productlist.push( ...arr )

            //返回的记录数量小于请求要加载的数量,说明是最后一批数据了
            this.isshowdowntxt = arrlens < rscount;
          }
          else {
            this.isshowdowntxt = true;
          }
        }
        else {
          this.isshowdowntxt = true;
        }
      } )();
    } ,
    //下拉刷新
    onPullDownRefresh () {
      ;( async () => {
        //每次搞2个
        let rscount = 2;
        let arr = await this.addproductlist( rscount , false );

        if ( arr != null && arr.length > 0 ) {
          this.productlist.unshift( ...arr )
        }

        wx.stopPullDownRefresh()
      } )();
    } ,
    //数据模型
    data () {
      return {
        //显示对话框
        showdialog : false ,
        //显示上拉到底提示文本
        isshowdowntxt : false ,
        //是显示空表格提示文本
        isshownulllisttxt : false ,
        //搜索值
        SearchVal : '' ,
        //产品列表
        productlist : [] ,

        runuserselectquery : {
          querytype : '' ,
          overtype : ''
        } ,

      }
    } ,
    //方法
    methods : {
      initdata () {
        this.productlist = [];
      } ,

      refreshlist () {

        let querycounts = 5;

        dlapi.querylist( this.getloginuserid ,
          this.userselectquery ,
          querycounts ).then( ( res ) => {

          // console.log( 're' , res )

          if ( res != null && res.length > 0 ) {
            this.productlist = res;

            this.isshownulllisttxt = false;
          }
          else {
            this.productlist = [];

            this.isshownulllisttxt = true;
          }

          //把 最下面的 底下提示取消
          this.isshowdowntxt = false;

        } );
      } ,

      addproductlist ( querycounts = 2 , isdown = false ) {

        return dlapi.querylistnew( this.getloginuserid ,
          this.userselectquery ,
          querycounts ,
          isdown ? this.minautokey : this.maxautokey ,
          isdown );

      } ,
      /*删除*/
      deletedata ( item , index ) {
        //重要操作

        //弹窗提示

        let productno = item.productno;
        let id = item.objectId;

        wx.showModal( {
          title : '提示' ,
          content : '工程单:' + productno + '确定删除?' ,
          success : res => {
            if ( res.confirm ) {
              // console.log( '用户点击确定' )

              this.DeleteCZ( index , id , productno )
            }
            else if ( res.cancel ) {
              // console.log( '用户点击取消' )
            }
          }
        } )
      } ,
      async DeleteCZ ( index , objectId , productno ) {

        // 加载动画
        wx.showLoading( {
          title : '保存中...' ,
          mask : true , //显示透明蒙层，防止触摸穿透
        } );

        var result = await Promise.all( [
          dlapi.deletebyid( objectId ) ,
          dllogapi.deletebyproductno( productno ) ,
          utils.runlongtims( 2000 )
        ] )

        // 取消加载动画
        wx.hideLoading()

        if ( result != null ) {

          this.ShowToastMsg( '成功' , true )

          //this.getproductlist( 5 );  不用去取数据，直接删除这条记录
          this.$delete( this.productlist , index )
        }
        else {
          this.ShowToastMsg( '失败' )
        }
      } ,
      alldata ( item ) {
        let productno = item.productno;

        const url = "../detaildata/main?productno=" + productno
        //转到详细页面
        wx.navigateTo( { url : url } )
      } ,
      async OverCZ ( productno , objectId , index ) {

        let userid = this.getloginuserid;
        let username = this.getloginusername;

        let now = new Date();
        let nowstr = dayjs( now ).format( constant.DateFormatString );

        //构建日志数据
        let objlog = {
          logruntype : logruntype.over ,
          userid : userid ,
          username : username ,
          productno : productno ,
          //这个日期可以不记录
          dates : '' ,
          //完成 没有备注
          comment : ''
        };

        // 加载动画
        wx.showLoading( {
          title : '保存中...' ,
          mask : true , //显示透明蒙层，防止触摸穿透
        } );

        var result = await Promise.all( [
          dlapi.over( objectId , nowstr ) ,
          dllogapi.adddllog( objlog ) ,
          utils.runlongtims( 1900 )
        ] )

        // 取消加载动画
        wx.hideLoading()

        if ( result != null ) {

          this.ShowToastMsg( '成功' , true )

          //this.getproductlist( 5 );  //不重新加载所有数据,直接修改这条数据
          let obj = await dlapi.getproductbyproductno( productno );

          if ( obj != null ) {
            this.$set( this.productlist , index , obj );
          }
        }
        else {
          this.ShowToastMsg( '失败' )
        }
      } ,
      overdata ( item , index ) {
        //重要操作，还是先验证一下吧  //弹窗提示

        let productno = item.productno;
        let id = item.objectId;

        wx.showModal( {
          title : '提示' ,
          content : '' + productno + '确定完成吗?' ,
          success : res => {
            if ( res.confirm ) {
              console.log( '用户点击确定' )

              this.OverCZ( productno , id , index );
            }
            else if ( res.cancel ) {
              // console.log( '用户点击取消' )
            }
          }
        } )
      } ,
      onClickCellQuery ( ee ) {
        // ee.mp.currentTarget.dataset.name 可以取到  van-cell 中设置的 data-name="v2"
        let val = ee.mp.currentTarget.dataset.name;

        // this.$store.dispatch( 'UpdateUserSelectQueryType' , val );
        this.UpdateUserSelectQueryType( val );
      } ,
      onClickCellOver ( ee ) {
        let val = ee.mp.currentTarget.dataset.name;

        // this.$store.dispatch( 'UpdateUserSelectOverType' , val );
        this.UpdateUserSelectOverType( val );
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

          console.log( '变化' )
          //刷新列表
          this.refreshlist();
        }

        this.showdialog = false;
      } ,
      onselecttype () {
        // this.runuserselectquery.isvalid = false;
        this.runuserselectquery.overtype = this.userselectquery.overtype;
        this.runuserselectquery.querytype = this.userselectquery.querytype;

        this.showdialog = true;

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
      } ,
      ismylist () {
        if ( this.userselectquery.querytype == 'myhelp' ) {
          return true;
        }

        return false;
      } ,
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
      /**
       * autokey列表
       * @returns {Array}
       */
      autokeylist () {
        let arr = [];
        if ( this.productlist != null && this.productlist.length > 0 ) {

          this.productlist.forEach( ( value , index , array ) => {
            arr.push( value.autokey )
          } );

        }

        return arr;
      } ,
      maxautokey () {
        let max = -1;

        if ( this.productlist != null && this.productlist.length > 0 ) {
          let initval = this.productlist[ 0 ].autokey; //把第一个给初始值

          max = this.productlist.reduce( ( total , currentValue , currentIndex , arr ) => {
            return total > currentValue.autokey ? total : currentValue.autokey;
          } , initval )
        }

        return max;
      } ,
      minautokey () {
        let min = -1;

        if ( this.productlist != null && this.productlist.length > 0 ) {
          let initval = this.productlist[ 0 ].autokey; //把第一个给初始值

          min = this.productlist.reduce( ( total , currentValue , currentIndex , arr ) => {
            return total < currentValue.autokey ? total : currentValue.autokey;
          } , initval )
        }

        return min;
      } ,
    } ,

    //生命周期(mounted)
    mounted () {
      console.log( 'querylist mouted' )
    } ,
    beforeCreate () {
      console.log( 'querylist beforeCreate' )
    } ,
    created () {
      console.log( 'querylist created' )
    } ,
    onLoad () {
      console.log( 'querylist onLoad' )
    } ,
    onReady () {
      console.log( 'querylist onReady' )
    } ,
    onShow () {
      console.log( 'querylist onShow' );

      if ( this.getisrefreshquerylist ) {
        this.refreshlist();

        this.UpdateRefreshQueryListToFslse(); //恢复状态
      }
    } ,
    onHide () {
      // this.initdata();

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
