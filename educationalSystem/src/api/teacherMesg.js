import request from '@/utils/request'
// 获取教师个人信息
export function getTeacherInfo() {
    return request({
        url: '/teacher/getTeacherInfo',
        method: 'post'
    })
}
// 保存教师提交的头像信息
export function saveTeacherInfo(data) {
    return request({
        url: '/teacher/saveTeacherInfo',
        method: 'post',
        data
    })
}
