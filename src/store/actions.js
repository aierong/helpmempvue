import {
  SetupUser ,
  SetupUserSelectProductData ,
  SetupUserSelectHelpManData ,
  ClearUserSelectHelpMan2 ,
} from './mutation-type'

export default {

  SetupUser ( { commit } , userdata ) {
    commit( SetupUser , userdata )
  } ,
  SetupUserSelectProductData ( { commit } , data ) {
    commit( SetupUserSelectProductData , data )
  } ,
  SetupUserSelectHelpManData ( { commit } , data ) {
    commit( SetupUserSelectHelpManData , data )
  } ,
  ClearUserSelectHelpMan2 ( { commit } ) {
    commit( ClearUserSelectHelpMan2 )
  }
}
