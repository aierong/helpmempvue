import Vue from 'vue'
import App from './App'

// 打开 main.js
import Bmob from "hydrogen-js-sdk";
// 初始化
Bmob.initialize( "eca6fbf1ee5ac340179514bb43e8042d" , "9334701aa2c615aceb991ef030f2e7a3" );

// 挂载到全局使用
Vue.prototype.$Bmob = Bmob

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue( App )
app.$mount()
