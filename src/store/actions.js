import { SetupUser } from './mutation-type'

export default {

  SetupUser ( { commit } , userdata ) {
    commit( SetupUser , userdata )
  } ,

}
