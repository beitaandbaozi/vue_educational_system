import request from '@/utils/request'
// 获取教师对应工号的教学任务信息
export function getTeachingTask() {
    return request({
        url: '/teacher/getTeachingTask',
        method: 'post'
    })
}
//  获取教师对应工号的教学任务信息（首页中应用）
export function getTeachingTaskLimit(){
    return request({
        url:'/teacher/getTeachTask?limit=2',
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
// 删除教学任务
export function delTeachingTask(cno, data) {
    return request({
        url: `/teacher/delTeachingTask/${cno}`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        data
    })
}
// 添加教学任务
export function addTeachingTask(cno, data){
    return request({
        url:`/teacher/addTeachingTask/${cno}`,
        method: 'post',
        headers:{
            'Content-Type': 'application/json; charset=UTF-8'
        },
        data
    })
}
