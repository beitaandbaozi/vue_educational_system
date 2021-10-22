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
export function getUserInfo() {
    return request({
        url: '/login/getUserInfo',
        method: 'post'
    })

}

// 修改密码
export function updatePaswd(data) {
    return request({
        url:'/users/updatePassword',
        method: 'post',
        data
    })
}
// 提交修改密码
export function commitPaswd(data){
    return request({
        url: '/users/commitPassword',
        method: 'post',
        data
    })
}
