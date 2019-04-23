/*
 作者: chenghao
 功能: js脚本
 */

export const loginuserdatamix = {
  //特别提示：下面这几个计算属性，要登录后调用
  computed : {
    getloginuserid () {
      return this.$store.getters.getloginuserid;
    } ,
    getloginusername () {
      return this.$store.getters.getloginusername;
    } ,
  } ,

}

