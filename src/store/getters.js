const getloginuserid = ( state ) => {
  if ( state.user != null ) {
    return state.user.userid;
  }
  return '';
}

const getloginusername = ( state ) => {
  if ( state.user != null ) {
    return state.user.username;
  }
  return '';
}

const getissaveok = ( state ) => {
  return state.issaveok;
}

const getisrefreshquerylist = ( state ) => {
  return state.isrefreshquerylist;
}

export default {

  getloginuserid ,

  getloginusername ,

  getissaveok ,
  getisrefreshquerylist

}
