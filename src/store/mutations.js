import {
  SetupUser ,
  SetupUserSelectProductData
} from './mutation-type'

export default {

  [ SetupUser ] ( state , userdata ) {
    state.user = userdata

  } ,
  [ SetupUserSelectProductData ] ( state , selectdata ) {
    state.userselectproductdata = selectdata

  } ,

}
