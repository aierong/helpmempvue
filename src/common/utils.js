/*
 作者: chenghao
 功能: js脚本
 */

export function runlongtims ( times ) {

  return new Promise( ( resolve , reject ) => {

    setTimeout( () => {
      resolve( "" );
    } , times );

  } )

}


