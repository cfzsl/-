import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/Home.vue'
import List from './components/home/component/list.vue'
import publicdetails from './components/ToiletList/publicdetails.vue'

import Management from './components/SystemManagement/Management.vue'
import OperationLog from './components/SystemManagement/Component/OperationLog.vue'
import Organization from './components/SystemManagement/Component/Organization.vue'
import PermissionSetting from './components/SystemManagement/Component/PermissionSetting.vue'
import UserManagement from './components/SystemManagement/Component/UserManagement.vue'

import HomeFour from './components/HomeFour.vue'

import ToiletManagement from './components/ToiletManagement/ToiletManagement.vue'
import ToiletFile from './components/ToiletManagement/Component/ToiletFile.vue'
import Appraisal from './components/ToiletManagement/Component/Appraisal.vue'
import Performance from './components/ToiletManagement/Component/Performance.vue'
import Details from './components/ToiletManagement/Component/Details.vue'
import Appeal from './components/ToiletManagement/Component/Appeal.vue'
import BaiduMap from './components/ToiletManagement/Component/BaiduMap.vue'
import Publictoiletdetails from './components/ToiletManagement/Component/Publictoiletdetails.vue'
import Rules from './components/ToiletManagement/Component/Rules.vue'
import CommentReview from './components/ToiletManagement/Component/CommentReview.vue'
import CommentList from './components/ToiletManagement/Component/CommentList.vue'
import PerformanceStatistics from './components/ToiletManagement/Component/PerformanceStatistics.vue'
import login from './views/login.vue'
import admin from './views/admin.vue'

Vue.use(Router)



export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'admin',
    //   component: admin
    // },
    {
      path: '/',
      name: '首页',
      component: Home,
    },
    {
      path: 'list',
      name: '报警列表',
      component: List
    },
    {
      path: '/login',
      name: '登录',
      component: login
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
          component: PermissionSetting,

        },
        {
          path: 'OperationLog',
          name: '操作日志',
          component: OperationLog
        }
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
          name: '地图',
          component: BaiduMap
        },
        {
          path: 'ToiletFile',
          name: '公厕档案',
          component: ToiletFile
        },
        {
          path: 'Appraisal',
          name: '绩效考核',
          component: Appraisal,
        },
        {
          path: 'Performance',
          name: '公厕绩效',
          component: Performance
        },
        {
          path: 'Details',
          name: '绩效详情',
          component: Details
        },
        {
          path: 'PerformanceStatistics',
          name: '考核统计',
          component: PerformanceStatistics
        },
        {
          path: 'Appeal',
          name: '报警申诉',
          component: Appeal
        },
        {
          path: 'Rules',
          name: '绩效规则',
          component: Rules
        },
        {
          path: 'CommentReview',
          name: '评论审核',
          component: CommentReview
        },
        {
          path: 'CommentList',
          name: '评论查看',
          component: CommentList
        }
      ]
    },
    {
      path: '/Publictoiletdetails',
      name: '管理视频',
      component: Publictoiletdetails
    }
  ]
})
