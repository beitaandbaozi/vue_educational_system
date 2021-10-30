import request from '@/utils/request'
// 获取开设课程信息
export function getSetUpCourse() {
    return request({
        url: '/course/getSetUpCourse',
        method: 'post'
    })
}