import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入学生页面的路由
import classSchedule from './modules/classSchedule'
import dormitoryService from './modules/dormitoryService'
import setUpCoures from './modules/setUpCoures'
import stuMesg from './modules/stuMesg'
import subCost from './modules/subCost'
import teachEvaluation from './modules/teachEvaluation'
import testTime from './modules/testTime'

// 引入教师页面的路由
import teacherMesg from './modules/teacherMesg'
import scoreManagement from './modules/scoreManagement'
import teacherTestTime from './modules/teacherTestTime'
import teachingTask from './modules/teachingTask'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * 静态路由
 * 没有权限控制
 * 所有权限角色都可以访问
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },



    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

// 动态路由
export const asyncRoutes = [
    classSchedule,
    setUpCoures,
    dormitoryService,
    subCost,
    teachEvaluation,
    testTime,
    stuMesg,
    scoreManagement,
    teacherTestTime,
    teachingTask,
    teacherMesg
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // 暂时合并
    routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
