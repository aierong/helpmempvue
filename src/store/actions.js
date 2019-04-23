import {
  SetupUser ,
  SetupUserSelectProductData ,
  ClearUserSelectProductData ,
  SetupUserSelectHelpManData ,
  ClearUserSelectHelpMan2 ,
  ClearUserSelectHelpManData ,
} from './mutation-type'

export default {

  SetupUser ( { commit } , userdata ) {
    commit( SetupUser , userdata )
  } ,
  SetupUserSelectProductData ( { commit } , data ) {
    commit( SetupUserSelectProductData , data )
  } ,
  ClearUserSelectProductData ( { commit } ) {
    commit( ClearUserSelectProductData )
  } ,
  SetupUserSelectHelpManData ( { commit } , data ) {
    commit( SetupUserSelectHelpManData , data )
  } ,
  ClearUserSelectHelpMan2 ( { commit } ) {
    commit( ClearUserSelectHelpMan2 )
  } ,
  ClearUserSelectHelpManData ( { commit } ) {
    commit( ClearUserSelectHelpManData )
  }
}
