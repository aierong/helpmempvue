/*
 作者: chenghao
 功能: js脚本
 */

//  引入
import Bmob from "hydrogen-js-sdk";

//表名称
import { DlTable } from '@/common/constant.js';
import * as mock from '@/common/mockdata/index.js'

import * as utils from '@/common/utils.js'
import * as constant from '@/common/constant.js'

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

/**
 * pmc答复
 * @param id
 * @param userid
 * @param username
 * @param pmsreplydate
 * @param addpmcreplydate
 * @param addpmcreplycomment
 * @returns {Promise<any>}
 */
export function reply ( id , userid , username , pmsreplydate , addpmcreplydate , addpmcreplycomment ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.set( 'id' , id ) //需要修改的objectId

    query.set( "pmsreplydate" , pmsreplydate )
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

/**
 * 完成
 * @param id
 * @param userid
 * @param username
 * @param overdate
 * @returns {Promise<any>}
 */
export function over ( id , overdate ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.set( 'id' , id ) //需要修改的objectId

    query.set( "isover" , true )

    query.set( "overdate" , overdate )

    query.save().then( res => {
      //console.log( res )

      resolve( res );

    } ).catch( err => {
      //console.log( err )

      resolve( null );
    } )
  } );
}

/**
 * 再次求助
 * @param id
 * @param helplasttime
 * @param csexpectdate
 * @returns {Promise<any>}
 */
export function againhelp ( id , helplasttime , csexpectdate , comment ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( DlTable );
    //这里 设置  列的数据

    query.get( id ).then( res => {
      console.log( res )

      //次数加1
      res.set( "helptimes" , res.helptimes + 1 )
      res.set( "helplasttime" , helplasttime )
      res.set( "csexpectdate" , csexpectdate )
      res.set( "comment" , comment )

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

/**
 * 得我需要答复的列表
 * @param userid
 * @param counts
 * @param autokeylist
 * @returns {*|Promise|Promise<any>}
 */
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

/**
 * 再次求助列表
 * @param userid
 * @param counts
 * @returns {*|Promise|Promise<any>}
 */
export function getmyagainhelplist ( userid , counts ) {
  const query = Bmob.Query( DlTable );

  query.equalTo( "isover" , "==" , false );
  //还没有复期的
  query.equalTo( "pmsreplydate" , "!=" , '' );

  let arr = utils.getdatelist( false , 250 , constant.DateFormatStringYMD , true );
  // console.log( 'arr' , arr )
  query.notContainedIn( "pmsreplydate" , arr );

  query.equalTo( "userid" , "==" , userid );

  //query.or( query1 , query2 );

  if ( counts > 0 ) {
    query.limit( counts );
  }

  query.order( "autokey" );

  return query.find();
}

/**
 * 我求助
 * @param userid
 * @param overtype 完成类型  2全部 1完成的 0未完成的
 * @returns {*|Promise|Promise<any>}
 */
export function getmycount ( userid , overtype = 2 ) {
  const query = Bmob.Query( DlTable );

  query.equalTo( "userid" , "==" , userid );

  if ( overtype == 1 ) {
    query.equalTo( "isover" , "==" , true );
  }

  if ( overtype == 0 ) {
    query.equalTo( "isover" , "==" , false );
  }

  return query.count();
}

/**
 * 求助我
 * @param userid
 * @param overtype 完成类型  2全部 1完成的 0未完成的
 * @returns {*|Promise|Promise<any>}
 */
export function gethelpmecount ( userid , overtype = 2 ) {
  const query = Bmob.Query( DlTable );

  if ( overtype == 1 ) {
    query.equalTo( "isover" , "==" , true );
  }

  if ( overtype == 0 ) {
    query.equalTo( "isover" , "==" , false );
  }

  const query1 = query.equalTo( "helppmc1" , "==" , userid );
  const query2 = query.equalTo( "helppmc2" , "==" , userid );

  query.or( query1 , query2 );

  return query.count();
}

/**
 * 待答复
 * @param userid
 * @returns {*|Promise|Promise<any>}
 */
export function getmyreplycount ( userid ) {
  const query = Bmob.Query( DlTable );

  query.equalTo( "isover" , "==" , false );
  //还没有复期的
  query.equalTo( "pmsreplydate" , "==" , '' );

  const query1 = query.equalTo( "helppmc1" , "==" , userid );
  const query2 = query.equalTo( "helppmc2" , "==" , userid );

  query.or( query1 , query2 );

  return query.count();
}

/**
 * 由id删除
 * @param id
 * @returns {Promise<any>}
 */
export function deletebyid ( id ) {
  return new Promise( ( resolve , reject ) => {
    const query = Bmob.Query( DlTable );

    query.destroy( id ).then( res => {
      // 成功删除  返回 {msg: "ok"}
      //id 错误或者不存在  返回 {code: 101, error: "object not found for a08b661111."}
      console.log( res )
      if ( res != null ) {
        if ( res.msg == 'ok' ) {
          resolve( true );
        }
        else {
          resolve( false );
        }

      }
      else {
        resolve( false );
      }
    } ).catch( err => {
      resolve( false );
    } )
  } );
}

/**
 * 查询列表
 * @param userid
 * @param userselectquery
 * @param querycounts
 * @param autokeylist
 * @param isasc
 * @returns {*|Promise|Promise<any>}
 */
export function querylist ( userid , userselectquery , querycounts ) {
  const query = Bmob.Query( DlTable );

  if ( userselectquery.overtype == 'notover' ) {
    query.equalTo( "isover" , "==" , false );
  }
  else if ( userselectquery.overtype == 'over' ) {
    query.equalTo( "isover" , "==" , true );
  }

  if ( userselectquery.querytype == 'myhelp' ) {
    //查询自己单据
    query.equalTo( "userid" , "==" , userid );
  }
  else {
    //查询求助我的单据
    const query1 = query.equalTo( "helppmc1" , "==" , userid );
    const query2 = query.equalTo( "helppmc2" , "==" , userid );

    query.or( query1 , query2 );
  }

  if ( querycounts > 0 ) {
    query.limit( querycounts );
  }

  query.order( "-autokey" );

  return query.find();
}

/**
 * 查询列表
 * @param userid
 * @param userselectquery
 * @param querycounts
 * @param maxminautokey
 * @param isdown
 * @returns {*|Promise|Promise<any>}
 */
export function querylistnew ( userid , userselectquery , querycounts , maxminautokey , isdown ) {
  const query = Bmob.Query( DlTable );

  if ( userselectquery.overtype == 'notover' ) {
    query.equalTo( "isover" , "==" , false );
  }
  else if ( userselectquery.overtype == 'over' ) {
    query.equalTo( "isover" , "==" , true );
  }

  if ( userselectquery.querytype == 'myhelp' ) {
    //查询自己单据
    query.equalTo( "userid" , "==" , userid );
  }
  else {
    //查询求助我的单据
    const query1 = query.equalTo( "helppmc1" , "==" , userid );
    const query2 = query.equalTo( "helppmc2" , "==" , userid );

    query.or( query1 , query2 );
  }

  if ( isdown ) {
    query.equalTo( "autokey" , "<" , maxminautokey );
  }
  else {
    query.equalTo( "autokey" , ">" , maxminautokey );
  }

  if ( querycounts > 0 && isdown ) {
    //下拉刷新 不做限制，全部取回来
    //上拉触底，限制数量
    query.limit( querycounts );
  }

  query.order( "-autokey" );

  return query.find();
}
