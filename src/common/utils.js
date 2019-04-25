/*
 作者: chenghao
 功能: js脚本
 */

import dayjs from 'dayjs'

/**
 * 长时间等待
 * @param 等待时间（毫秒）
 * @returns {Promise<any>}
 */
export function runlongtims ( times ) {

  return new Promise( ( resolve , reject ) => {

    setTimeout( () => {
      resolve( "" );
    } , times );

  } )

}

/**
 * 得日期列表
 * @param 是包含今天
 * @param 天数
 * @param 日期格式化字符
 * @returns {Array}
 */
export function getdatelist ( isincludetoday , counts , formatstring ) {

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

