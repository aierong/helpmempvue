/*
 作者: chenghao
 功能: js脚本
 */

export const mixmethods = {

  methods : {
    //设置页面标题
    setuppagetitle ( _title ) {
      // let _title = this.getloginusername + '的主页'

      wx.setNavigationBarTitle( { title : _title } );
    } ,

  } ,
}
