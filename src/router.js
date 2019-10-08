import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/Home.vue'
import publicdetails from './components/ToiletList/publicdetails.vue'

import Management from './components/SystemManagement/Management.vue'
import OperationLog from './components/SystemManagement/Component/OperationLog.vue'
import Organization from './components/SystemManagement/Component/Organization.vue'
import PermissionSetting from './components/SystemManagement/Component/PermissionSetting.vue'
import UserManagement from './components/SystemManagement/Component/UserManagement.vue'


import HomeFour from './components/HomeFour.vue'

import ToiletManagement from './components/ToiletManagement/ToiletManagement.vue'
import ToiletFile from './components/ToiletManagement/Component/ToiletFile.vue'
import Appraisal from "./components/ToiletManagement/Component/Appraisal.vue"
import BaiduMap from "./components/ToiletManagement/Component/BaiduMap.vue"
import Publictoiletdetails from './components/ToiletManagement/Component/Publictoiletdetails.vue'
import Rules from './components/ToiletManagement/Component/Rules.vue'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/Login',
      name: '登录',
      component: Login
    },
    {
      path: '/publicdetails',
      name: '公厕列表',
      component: publicdetails
    },
    {
      path: '/Management',
      component: Management,
      children: [
        {
          path: '',
          name: '组织结构',
          component: Organization
        },
        {
          path: 'UserManagement',
          name: '用户管理',
          component: UserManagement
        },
        {
          path: 'PermissionSetting',
          name: '权限设置',
          component: PermissionSetting
        },
        {
          path: 'OperationLog',
          name: '操作日志',
          component: OperationLog
        },
      ]
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
        {
          path: 'Rules',
          name: '绩效规则',
          component: Rules
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
