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
        url: `/teacher/getTeachingTask/${cno}`,
        method: 'post',
        
    })
}