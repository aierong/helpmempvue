import { SetupUser } from './mutation-type'



export default {
  // getList ( { commit } ) {
  //   console.log( "actions" )
  //   //触发对应的mutation
  //   commit( RECEIVE_LIST , listData )
  // } ,
  // getMoviesArr ( { commit } , data ) {
  //   commit( MOVIES_ARR , data )
  // } ,
  // decrement ( { commit } ) {
  //   commit( decrement )
  // } ,
  SetupUser ( { commit } ) {
    commit( SetupUser )
  } ,

}
