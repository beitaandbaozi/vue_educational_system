import request from '@/utils/request'
// 获取教师个人信息
export function getTeacherInfo() {
    return request({
        url: '/teacher/getTeacherInfo',
        method: 'post'
    })
}