import {
  SetupUser ,
  SetupUserSelectProductData ,
  ClearUserSelectProductData ,
  SetupUserSelectHelpManData ,
  ClearUserSelectHelpMan2 ,
  ClearUserSelectHelpManData ,
} from './mutation-type'

export default {

  [ SetupUser ] ( state , userdata ) {

    state.user = userdata

  } ,
  [ SetupUserSelectProductData ] ( state , selectdata ) {

    state.userselectproductdata = selectdata

  } ,
  [ ClearUserSelectProductData ] ( state ) {

    state.userselectproductdata = {
      productno : '' ,
      custno : '' ,
      pono : '' ,

      itemno : '' ,
      itemsname : '' ,
      poqty : 0
    }

  } ,
  [ SetupUserSelectHelpManData ] ( state , data ) {

    state.userselecthelpman = data

  } ,

  //清除第2个人员信息
  [ ClearUserSelectHelpMan2 ] ( state ) {

    state.userselecthelpman.helppmc2 = '';
    state.userselecthelpman.helppmcname2 = ''

  } ,
  [ ClearUserSelectHelpManData ] ( state ) {

    state.userselecthelpman = {
      helppmc1 : '' ,
      helppmcname1 : '' ,
      helppmc2 : '' ,
      helppmcname2 : ''
    }
  } ,
}
