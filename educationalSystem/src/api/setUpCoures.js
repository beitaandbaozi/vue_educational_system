import request from '@/utils/request'
// 获取开设课程信息
export function getSetUpCourse(data) {
    return request({
        url: '/course/getSetUpCourse',
        method: 'post',
        data
    })
}
// 根据课程代码获取对应的课程资料
export function getCourseById(id) {
    return request({
        url: `/course/getSetUpCourse/${id}`,
        method: 'get',
    })

}
// 编辑提交
export function editCouresSubmit(id, data) {
    return request({
        url: `/course/editCouresSubmit/${id}`,
        method: 'post',
        data
    })
}
// 根据课程代码删除对应的课程
export function delCouresById(id) {
    return request({
        url: `/course/delCouresById/${id}`,
        method: 'post'
    })
}