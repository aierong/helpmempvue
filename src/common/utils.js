/*
 作者: chenghao
 功能: js脚本
 */

import dayjs from 'dayjs'

import { logruntype } from '@/common/constant.js';

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
      let addday = index;

      if ( !isincludetoday ) {
        addday = index + 1;
      }

      arr.push( now.add( addday , 'day' ).format( formatstring ) )
    }
  }

  return arr;
}

/**
 * 得日志表日志表数据类型描述
 * @param logruntype
 */
export function getlogruntypedesc ( logruntypecode ) {
  if ( logruntypecode == logruntype.add ) {
    return '添加'
  }

  if ( logruntypecode == logruntype.update ) {
    return '修改'
  }

  if ( logruntypecode == logruntype.reply ) {
    return '答复'
  }

  if ( logruntypecode == logruntype.againhelp ) {
    return '再求助'
  }

  return '';
}
