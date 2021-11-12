/**
 * Vuex的权限模块
 */
import { constantRoutes, asyncRoutes } from "@/router";
import store from '@/store'

function hasPermission(route, roles) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
    // allRoutes是动态路由表
    // roles是取到的用户角色，数组
    let rightRoutes = allRoutes.filter((route, index) => {
        if (hasPermission(route, roles)) {
            if (route.children && route.children.length) {
                route.children = baseRoleGetRouters(route.children, roles)
            }
            return true
        }
        return false
    })
    return rightRoutes
}


// vuex中的permission模块用来存放当前的 静态路由  + 当前用户的 权限路由
const state = {
    routes: constantRoutes //所有人默认拥有静态路由
}
const mutations = {
    // newRoutes 可以认为是 用户登录 通过权限所得到的动态路由部分
    setRoutes(state, newRoutes) {
        state.routes = [...constantRoutes, ...newRoutes]
        console.log(state.routes)
    }
}
const actions = {
    async filterRoutes(context) {
        var { role } = await store.dispatch('user/getUserInfo')
        var getRoutes = baseRoleGetRouters(asyncRoutes, [role])
        context.commit('setRoutes', getRoutes)
        return getRoutes
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
