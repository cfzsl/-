import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/communal.css'
import BaiduMap from 'vue-baidu-map'

// rem适配

import 'amfe-flexible';


require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
import 'videojs-contrib-hls';




Vue.use(Vant);

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ydPscWsaF9oqc1DOYtPgmCTmAUdqG4Cq'
})

Axios.defaults.baseURL = 'http://47.110.160.217:5080/'

Vue.prototype.$http = Axios

// 拦截器
Axios.interceptors.response.use(function (res) {
  return res.data;
})

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
