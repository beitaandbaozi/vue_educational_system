import request from '@/utils/request'
// 获取学生个人信息
export function getStuInfo() {
    return request({
        url: '/student/getStuInfo',
        method: 'post'
    })
}
// 获取必修课信息
export function getRequireCourseInfo() {
    return request({
        url: '/student/getRequireCourseInfo',
        method: 'post'
    })
}