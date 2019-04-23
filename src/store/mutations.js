import {
  SetupUser ,
  SetupUserSelectProductData ,
  SetupUserSelectHelpManData ,
  ClearUserSelectHelpMan2 ,
} from './mutation-type'

export default {

  [ SetupUser ] ( state , userdata ) {
    state.user = userdata

  } ,
  [ SetupUserSelectProductData ] ( state , selectdata ) {
    state.userselectproductdata = selectdata

  } ,
  [ SetupUserSelectHelpManData ] ( state , data ) {
    state.userselecthelpman = data

  } ,
  //清除第2个人员信息
  [ ClearUserSelectHelpMan2 ] ( state ) {
    state.userselecthelpman.helppmc2 = '';
    state.userselecthelpman.helppmcname2 = ''

  } ,
}
