/*
 作者: chenghao
 功能: js脚本
 */

//  引入
import Bmob from "hydrogen-js-sdk";

//表名称
import { DlTable } from '@/common/constant.js';
import * as mock from '@/common/mockdata/index.js'

//添加dl
export function adddl ( dl ) {

  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.set( "userid" , dl.userid )
    query.set( "username" , dl.username )
    query.set( "productno" , dl.productno )
    query.set( "custno" , dl.custno )
    query.set( "pono" , dl.pono )
    query.set( "itemno" , dl.itemno )

    query.set( "itemsname" , dl.itemsname )
    query.set( "helptimes" , dl.helptimes )
    query.set( "helplasttime" , dl.helplasttime )

    query.set( "csexpectdate" , dl.csexpectdate )
    query.set( "pmsreplydate" , dl.pmsreplydate )
    query.set( "addpmcreplycomment" , dl.addpmcreplycomment )
    query.set( "addpmcreplydate" , dl.addpmcreplydate )

    query.set( "addpmcman" , dl.addpmcman )
    query.set( "addpmcmanname" , dl.addpmcmanname )
    query.set( "comment" , dl.comment )

    query.set( "overdate" , dl.overdate )
    query.set( "helppmc1" , dl.helppmc1 )
    query.set( "helppmc2" , dl.helppmc2 )

    query.set( "helppmcname1" , dl.helppmcname1 )
    query.set( "helppmcname2" , dl.helppmcname2 )

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

// 得产品列表
export function getproductlist ( counts ) {
  // let resultarr = [];

  let mockarr = mock.gethelpproduct( counts );

  return mockarr;

  // if ( mockarr != null && mockarr.length > 0 ) {
  //
  //   let len = mockarr.length;
  //
  //   for ( let index = 0 ; index < len ; index++ ) {
  //
  //     // console.log( a[ index ] );
  //     let item = mockarr[ index ];
  //
  //     let obj = {
  //       productno : item.productno ,
  //       custno : item.custno ,
  //       pono : item.pono ,
  //       itemno : item.itemno ,
  //       itemsname : item.itemsname
  //     };
  //
  //     resultarr.push( obj );
  //   }

  // }

  // return resultarr;
}


