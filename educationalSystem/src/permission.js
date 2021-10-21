/**
 * 路由权限管理
 */
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 定义一份白名单，不受权限控制的页面
const whiteList = ['/login', '/404']
// 路由前置守卫
router.beforeEach(function (to, from, next) {
    // 开启进度条
    NProgress.start()
    // 首先判断有无token
    if (store.getters.token) {
        // 判断是否去登录页
        if (to.path == '/login') {
            // 跳转到主页
            next('/');
        } else {
            // 直接放行
            next()
        }
    } else {
        // 没有token的情况
        if (whiteList.indexOf(to.path) > -1) {
            // 说明找到了，在名单里面
            next()
        }else{
            next('/login')
        }
    }
    // 关闭进度条
    NProgress.done()
})

// 后置守卫
router.afterEach(function(){
    NProgress.done()
})