import request from '@/utils/request'
// 获取全部学生信息
export function getAllStudents(data) {
    return request({
        url: '/admin/getAllStudents',
        method: 'post',
        data
    })
    
}