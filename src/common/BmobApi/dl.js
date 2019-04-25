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
    query.set( "poqty" , dl.poqty )

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
    query.set( "isover" , dl.isover )

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

  let mockarr = mock.gethelpproduct( counts );

  return mockarr;

}

//是存在相同的 工程单
export function isexistsproductno ( productno ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.equalTo( "productno" , "==" , productno );

    query.find().then( res => {
      //返回的是数组,没有找到就是空数组
      //console.log( res )

      if ( res != null && res.length > 0 ) {
        //是存在  相同的
        resolve( true );
      }
      else {
        resolve( false );
      }
    } );

  } );
}

/**
 * 由工程单号得详细数据
 * @param productno
 * @returns {*|Promise|Promise<any>}
 */
export function getproductbyproductno ( productno ) {
  return new Promise( ( resolve , reject ) => {
    const query = Bmob.Query( DlTable );

    query.equalTo( "productno" , "==" , productno );
    query.limit( 1 );
    query.order( "-autokey" );

    query.find().then( res => {
      //返回的是数组,没有找到就是空数组
      //console.log( res )

      if ( res != null && res.length > 0 ) {
        //是存在
        resolve( res[ 0 ] );
      }
      else {
        resolve( null );
      }
    } );
  } );

}

//得未完成 工程单数量
export function getontworkcounts ( userid ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.equalTo( "userid" , "==" , userid );
    // isover 为完成的
    query.equalTo( "isover" , "==" , false );

    query.count().then( res => {
      //返回的是 数字
      // console.log( res )
      resolve( res );
    } );

  } );
}

//pmc答复
export function reply ( id , userid , username , addpmcreplydate , addpmcreplycomment ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.set( 'id' , id ) //需要修改的objectId

    query.set( "addpmcman" , userid )
    query.set( "addpmcmanname" , username )
    query.set( "addpmcreplydate" , addpmcreplydate )
    query.set( "addpmcreplycomment" , addpmcreplycomment )

    query.save().then( res => {
      //console.log( res )

      resolve( res );

    } ).catch( err => {
      //console.log( err )

      resolve( null );
    } )
  } );
}

// 再次求助
export function againhelp ( id , helplasttime , csexpectdate ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.get( id ).then( res => {
      console.log( res )

      //次数加1
      res.set( "helptimes" , res.helptimes + 1 )
      res.set( "helplasttime" , helplasttime )
      res.set( "csexpectdate" , csexpectdate )
      res.set( "pmsreplydate" , '' )
      res.set( "addpmcreplycomment" , '' )

      res.set( "addpmcreplydate" , '' )
      res.set( "addpmcman" , '' )
      res.set( "addpmcmanname" , '' )

      res.save()

      resolve( res );
    } ).catch( err => {
      console.log( err )

      resolve( null );
    } )

  } );
}

//得我需要答复的
export function getmyreply ( userid , counts , autokeylist ) {
  const query = Bmob.Query( DlTable );

  query.equalTo( "isover" , "==" , false );
  //还没有复期的
  query.equalTo( "pmsreplydate" , "==" , '' );

  if ( autokeylist != null && autokeylist.length > 0 ) {
    query.notContainedIn( "autokey" , autokeylist );
  }

  const query1 = query.equalTo( "helppmc1" , "==" , userid );
  const query2 = query.equalTo( "helppmc2" , "==" , userid );

  query.or( query1 , query2 );

  if ( counts > 0 ) {
    query.limit( counts );
  }

  query.order( "autokey" );

  return query.find();
}


