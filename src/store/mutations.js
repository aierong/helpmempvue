import {
  SetupUser
} from './mutation-type'

export default {

  [ SetupUser ] ( state , userdata ) {
    state.user = userdata
    // console.log( state )
  } ,

}
