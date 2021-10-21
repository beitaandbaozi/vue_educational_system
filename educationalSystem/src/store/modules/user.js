import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken,setTimeStamp } from '@/utils/auth'
import { resetRouter } from '@/router'

// 状态
const state = {
    // 设置token初始状态
    token: getToken(),
    userInfo: {}
}
//  修改状态
const mutations = {
    // 设置token
    setToken(state, token) {
        state.token = token;
        // 当Vuex发生变化时，同步到缓存中
        setToken(token)
    },
    // 删除缓存
    removeToken(state) {
        state.token = null // 删除vuex的token
        removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
        state.userInfo = { ...userInfo }
    },
    removeUserInfo(state) {
        state.userInfo = {}
    }
}
//  执行异步
const actions = {
    // 登录
    async login(context, data) {
        const res = await login(data);
        // axios默认给数据加了一层data
        // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
        // 现在有用户token
        // actions 修改state 必须通过mutations
        context.commit('setToken', res);
        // 写入时间戳
        setTimeStamp() // 将当前的最新时间写入缓存
    },
    // 获取用户资料
    async getUserInfo(context) {
        const res = await getUserInfo();
        // 将整个用户的信息设置到用户的vuex中
        context.commit('setUserInfo', res);
        return res;
    },
    // 退出登录
    // 登出的action
    logout(context) {
        // 删除token
        context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
        // 删除用户资料
        context.commit('removeUserInfo') // 删除用户信息
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

