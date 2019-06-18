export default {

  user : null ,

  /**
   * 是保存ok
   */
  issaveok : false ,

  /**
   * 是刷新查询列表
   */
  isrefreshquerylist : true ,

  //操作者选择的数据类型
  userselectquery : {
    // 我求助的单据:myhelp    求助我的单据:helpmy
    querytype : 'myhelp' ,
    //全部:all     未完成:notover      已完成:over
    overtype : 'all'
  } ,

  //操作者选择的产品
  userselectproductdata : {
    productno : '' ,
    custno : '' ,
    pono : '' ,

    itemno : '' ,
    itemsname : '' ,
    poqty : 0 ,

  } ,

  //操作者选择的求助人
  userselecthelpman : {
    helppmc1 : '' ,
    helppmcname1 : '' ,
    helppmc2 : '' ,
    helppmcname2 : ''
  } ,
}
