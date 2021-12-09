import request from '@/utils/request'
// 获取全部教师信息
export function getAllTeachers(data) {
    return request({
        url: '/admin/getAllTeachers',
        method: 'post',
        data
    })
}