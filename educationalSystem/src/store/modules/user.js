import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 状态
const state = {
    // 设置token初始状态
    token: getToken()
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
    }
}
//  执行异步
const actions = {
    // 登录
    async login(context, data) {
        const res = await login(data);
        if (res.data.status == 200) {
            context.commit('setToken', res.data.token)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

