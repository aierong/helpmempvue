/*
 作者: chenghao
 功能: js脚本
 */
import { mapGetters } from 'vuex'

export const loginuserdatamix = {
  //特别提示：下面这几个计算属性，要登录后调用
  computed : {

    ...mapGetters( {
      //是保存成功状态
      // 如果你想将一个 getter 属性另取一个名字，使用对象形式
      getloginuserid : 'getloginuserid' ,
      getloginusername : 'getloginusername'
    } ) ,
  } ,

}
