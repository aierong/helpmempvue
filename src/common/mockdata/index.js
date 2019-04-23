/*
 作者: chenghao
 功能: js脚本
 */

// 引入mockjs
import Mock from 'mockjs'
//var Mock = require('mockjs')  //这样也可以

var Random = Mock.Random

const gethelpproduct = function ( mockcounts ) {
  let arrs = []

  for ( let i = 0 ; i < mockcounts ; i++ ) {
    let qz = 'AJ';

    if ( i <= 2 ) {
      qz = "CJ";
    }
    else if ( i > 2 && i < 8 ) {
      qz = 'DJ';
    }

    var now = new Date();
    var m = now.getMonth() + 1;
    var d = now.getDate();

    var all = now.getTime();

    qz = qz + m.toString() + d.toString() + all.toString();

    let newArticleObject = {
      productno : qz ,
      custno : Random.string( 'lower' , 4 , 5 ) ,
      pono : ( i > 10 ? 'AS' : 'BS' ) + Random.string( 'number' , 6 , 6 ) ,

      itemno : Random.string( 'lower' , 4 , 5 ) + Random.string( 'number' , 3 , 3 ) ,
      itemsname : Random.cname() + Random.csentence( i > 10 ? 5 : 6 ) ,
      poqty : parseInt( Random.string( 'number' , 6 , 6 ) )

    }

    arrs.push( newArticleObject )
  }

  return arrs
}

export {

  gethelpproduct

}


