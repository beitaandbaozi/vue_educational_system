import request from '@/utils/request'

// 登录信息
export function login(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getUserInfo(token) {
    return require({
        url: '/login/getUserInfo',
        method: 'get',
        params: { token }
    })

}

export function logout() {

}
