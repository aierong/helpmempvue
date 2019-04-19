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
    // var h = now.getHours();
    // var mi = now.getMinutes();
    var all = now.getTime();
    //+ h.toString() + mi.toString()
    qz = qz + m.toString() + d.toString() + all.toString();

    let newArticleObject = {
      productno : qz ,
      custno : Random.csentence( i > 10 ? 5 : 6 ) ,
      title : Random.csentence( 5 ) ,
      content : Random.cparagraph( 5 , 7 ) ,
      time : Random.date() + ' ' + Random.time() ,
      location : Random.city() ,
      author_name : Random.cname() ,
      date : Random.date() + ' ' + Random.time() ,

      // thumbnail_pic_s : Random.dataImage( '100x50' , '俺mock图片' )
    }
    arrs.push( newArticleObject )
  }

  return arrs
}

export {

  gethelpproduct

}


