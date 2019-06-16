/*
 作者: chenghao
 Date: 2019/5/25
 Time: 10:27
 功能: js脚本
 */
import { mapGetters } from 'vuex'

export const commoncomputed = {

  computed : {

    ...mapGetters( {
      //是保存成功状态
      // 如果你想将一个 getter 属性另取一个名字，使用对象形式
      getissaveok : 'getissaveok'

    } ) ,
  } ,

}


