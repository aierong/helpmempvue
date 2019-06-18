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
    querytype : 'myhelp' ,
    //全部 未完成 已完成
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
