import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/Home.vue'
import publicdetails from './components/ToiletList/publicdetails.vue'

import Management from './components/SystemManagement/Management.vue'

import HomeFour from './components/HomeFour.vue'

import ToiletManagement from './components/ToiletManagement/ToiletManagement.vue'
import ToiletFile from './components/ToiletManagement/Component/ToiletFile.vue'
import Appraisal from "./components/ToiletManagement/Component/Appraisal.vue"
import BaiduMap from "./components/ToiletManagement/Component/BaiduMap.vue"
import Publictoiletdetails from './components/ToiletManagement/Component/Publictoiletdetails.vue'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/publicdetails',
      name: '公厕列表',
      component: publicdetails
    },
    {
      path: '/Management',
      name: '系统管理',
      component: Management
    },
    {
      path: '/HomeFour',
      name: '厕所详情',
      component: HomeFour
    },
    {
      path: '/ToiletManagement',
      component: ToiletManagement,
      children: [
        {
          path: '',
          name: '管理地图',
          component: BaiduMap
        },
        {
          path: 'ToiletFile',
          name: '管理档案',
          component: ToiletFile
        },
        {
          path: 'Appraisal',
          name: '管理考核',
          component: Appraisal
        },
      ]
    },
    {
      path: '/Publictoiletdetails',
      name: '管理视频',
      component: Publictoiletdetails
    },
  ]
})
