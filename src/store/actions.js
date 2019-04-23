import {
  SetupUser ,
  SetupUserSelectProductData
} from './mutation-type'

export default {

  SetupUser ( { commit } , userdata ) {
    commit( SetupUser , userdata )
  } ,
  SetupUserSelectProductData ( { commit } , data ) {
    commit( SetupUserSelectProductData , data )
  } ,
}
