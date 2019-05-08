/*
 作者: chenghao
 功能: js脚本
 */

export const mixmethods = {

  methods : {
    //设置页面标题
    setuppagetitle ( _title ) {

      wx.setNavigationBarTitle( { title : _title } );
    } ,
    ShowToastMsg ( _title = '消息' , _isicon = false , _duration = 2000 ) {
      wx.showToast( {
        title : _title , //提示的内容,
        icon : !_isicon ? 'none' : 'success' ,
        duration : _duration , //延迟时间,
        mask : true , //显示透明蒙层，防止触摸穿透,

      } );
    } ,
  } ,
}
