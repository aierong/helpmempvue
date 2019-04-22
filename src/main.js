import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

//将store对象放置在Vue的原型上, 为的是每个实例都可以使用
Vue.prototype.$store = store

// 打开 main.js
import Bmob from "hydrogen-js-sdk";
// 初始化
Bmob.initialize( "78f2882af40774e452922d8a97fcad6a" ,
  "07b65c92aba4eda938c4a6ce8469cc3a" );

// 挂载到全局使用
Vue.prototype.$Bmob = Bmob

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue( App )
app.$mount()
