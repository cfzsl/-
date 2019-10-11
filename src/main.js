import Vue from 'vue'
import App from './App.vue'
import router from './router'
import qs from 'qs'
import Axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/communal.css'
import BaiduMap from 'vue-baidu-map'
// 物理返回按钮测试
// import Back from './components/component/backbtn'
import Mui from 'vue-awesome-mui'

// 路由守卫
import './utils/permission'


// rem适配
import 'amfe-flexible'
import 'videojs-contrib-hls'

import echarts from 'echarts'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// 页面跳转后 滚动条初始化
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.use(Vant)
Vue.use(Mui)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ydPscWsaF9oqc1DOYtPgmCTmAUdqG4Cq'
})

Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// Axios.defaults.baseURL = 'http://192.168.8.109:9090/'
Axios.defaults.baseURL = 'http://47.110.160.217:5080/'

Vue.prototype.$http = Axios
Vue.prototype.$qs = qs

// 拦截器
Axios.interceptors.response.use(function (res) {
  return res.data
})
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  // Back,
  router,
  render: h => h(App)
}).$mount('#app')
