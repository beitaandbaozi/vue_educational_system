import request from '@/utils/request'
// 获取全部学生信息
export function getAllStudent(data) {
    return request({
        url: '/course/getSetUpCourse',
        method: 'post',
        data
    })
    
}