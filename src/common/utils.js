/*
 作者: chenghao
 功能: js脚本
 */

import dayjs from 'dayjs'

export function runlongtims ( times ) {

  return new Promise( ( resolve , reject ) => {

    setTimeout( () => {
      resolve( "" );
    } , times );

  } )

}


export function getdatelist ( isincludetoday , counts , formatstring ) {
  // 'YYYY-MM-DD'



  let now = dayjs();  //得今天

  let arr = [];

  for ( let index = 0 ; index < counts ; index++ ) {
    if ( index == 0 ) {
      if ( isincludetoday ) {
        arr.push( now.format( formatstring ) )
      }
      else {
        arr.push( now.add( index + 1 , 'day' ).format( formatstring ) )
      }
    }
    else {
      let addday = index + 1;
      if ( !isincludetoday ) {
        addday = index + 2;
      }

      arr.push( now.add( addday , 'day' ).format( formatstring ) )
    }
  }

  return arr;
}

