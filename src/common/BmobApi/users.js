/*
 作者: chenghao
 功能: js脚本
 */
import Bmob from "hydrogen-js-sdk";
//表名称
import { UserTable } from '@/common/constant.js';

//添加用户
export function adduser ( registerUser ) {

  return new Promise( ( resolve , reject ) => {

    console.log( 'registerUser' , registerUser )

    const query = Bmob.Query( UserTable );
    //这里 设置  列的数据

    query.set( "userid" , registerUser.userid )
    query.set( "username" , registerUser.username )
    query.set( "pwd" , registerUser.pwd )

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

//是存在用户id 存在手机号码
export function isexistsuserid ( userid ) {
  return new Promise( ( resolve , reject ) => {
    console.log( UserTable )

    console.log( Bmob )
    const query = Bmob.Query( UserTable );
    query.equalTo( "userid" , "==" , userid );

    query.find().then( res => {
      //返回的是数组,没有找到就是空数组
      console.log( 'res' , res )

      if ( res != null && res.length > 0 ) {
        resolve( {
          //是存在
          isexists : true ,
          data : res[ 0 ]
        } );
      }
      else {
        resolve( {
          isexists : false ,
          data : null
        } );
      }
    } );
  } );
}

//登录
export function login ( userid , pwd ) {
  return new Promise( ( resolve , reject ) => {

    const query = Bmob.Query( tableName_users );
    query.equalTo( "pwd" , "==" , pwd );
    query.equalTo( "userid" , "==" , userid );

    query.find().then( res => {
      //返回的是数组,没有找到就是空数组
      //console.log( res )

      if ( res != null && res.length > 0 ) {
        resolve( {
          //是存在 可以登录
          isok : true ,
          data : res[ 0 ]
        } );
      }
      else {
        resolve( {
          isok : false ,
          data : null
        } );
      }
    } );
  } );
}


