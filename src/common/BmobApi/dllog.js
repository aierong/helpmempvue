/*
 作者: chenghao
 功能: js脚本
 */

//  引入
import Bmob from "hydrogen-js-sdk";

//表名称
import { DlLogTable } from '@/common/constant.js';

//添加dllog
export function adddllog ( dllog ) {

  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlLogTable );
    //这里 设置  列的数据

    query.set( "logruntype" , dllog.logruntype )
    query.set( "userid" , dllog.userid )
    query.set( "username" , dllog.username )
    query.set( "productno" , dllog.productno )
    query.set( "dates" , dllog.dates )
    query.set( "comment" , dllog.comment )

    query.save().then( res => {
      //console.log( res )

      resolve( res );
      //返回创建时间和id
      // {
      //     createdAt: "YYYY-mm-dd HH:ii:ss",
      //         objectId: "objectId"
      // }
    } ).catch( err => {
      //console.log( err )

      resolve( null );
    } )
  } );
}

//由工程单号查询列表
export function getloglistbyproductno ( productno ) {
  const query = Bmob.Query( DlLogTable );

  query.equalTo( "productno" , "==" , productno );

  query.order( "autokey" );

  return query.find();
}
