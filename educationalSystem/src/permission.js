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
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start()
    // 首先判断有无token
    if (store.getters.token) {
        // 判断是否去登录页
        if (to.path == '/login') {
            // 跳转到主页
            next('/');
        } else {
            if (!store.getters.userId) {
                // 如果没有id这个值 才会调用 vuex的获取资料的action
                await store.dispatch('user/getUserInfo')
                // 为什么要写await 因为我们想获取完资料再去放行
                const routes = await store.dispatch('permission/filterRoutes');
                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
                next(to.path)      
            }else{
                next()
            }
        }
    } else {
        // 没有token的情况
        if (whiteList.indexOf(to.path) > -1) {
            // 说明找到了，在名单里面
            next()
        } else {
            next('/login')
        }
    }
    // 关闭进度条
    NProgress.done()
})

// 后置守卫
router.afterEach(function () {
    NProgress.done()
})