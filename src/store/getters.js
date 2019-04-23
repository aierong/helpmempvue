const getloginuserid = ( state ) => {
  if ( state.user != null ) {
    return state.user.userid;
  }
  return '';
}

export default {
  getuserid ,

}
