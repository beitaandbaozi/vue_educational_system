import request from '@/utils/request'
// 获取教师对应工号的教学任务信息
export function getTeachingTask() {
    return request({
        url: '/teacher/getTeachingTask',
        method: 'post'
    })
}
// 获取教师对应工号的课程的教学任务信息
export function getTeachingTaskByCno(cno) {
    return request({
        url: `/teacher/getTeachingTaskByCno/${cno}`,
        method: 'post',

    })
}
// 编辑教学任务
export function editTeachingTask(cno, data) {
    return request({
        url: `/teacher/editTeachingTask/${cno}`,
        method: 'post',
        data
    })
}