import {
  SetupUser ,
  SetupUserSelectProductData ,
  ClearUserSelectProductData ,
  SetupUserSelectHelpManData ,
  ClearUserSelectHelpMan2 ,
  ClearUserSelectHelpManData ,
  UpdateUserSelectQueryType ,
  UpdateUserSelectOverType ,
  UpdateSaveOk ,
  UpdateRefreshQueryList
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
  } ,
  UpdateUserSelectQueryType ( { commit } , data ) {
    commit( UpdateUserSelectQueryType , data )
  } ,
  UpdateUserSelectOverType ( { commit } , data ) {
    commit( UpdateUserSelectOverType , data )
  } ,
  UpdateSaveOk ( { commit } , isok ) {
    commit( UpdateSaveOk , isok )
  } ,
  UpdateRefreshQueryList ( { commit } , isrefresh ) {
    commit( UpdateRefreshQueryList , isrefresh )
  } ,
}
