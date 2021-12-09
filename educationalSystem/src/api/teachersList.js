import request from '@/utils/request'
// 获取全部教师信息
export function getAllTeachers(data) {
    return request({
        url: '/admin/getAllTeachers',
        method: 'post',
        data
    })
}
// 通过工号获取对应教师的数据
export function getTeacherByNum(id){
    return request({
        url:`/admin/getTeacherByNum/${id}`,
        method: 'get'
    })
}