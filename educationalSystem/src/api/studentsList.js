import request from '@/utils/request'
// 获取全部学生信息
export function getAllStudents(data) {
    return request({
        url: '/admin/getAllStudents',
        method: 'post',
        data
    })
}
// 获取系别信息
export function getAllDuty() {
    return request({
        url: '/admin/getAllDuty',
        method: 'get',
    })
}
// 根据学年和系别查询数据
export function searchByStudents(data) {
    return request({
        url: '/admin/searchByStudents',
        method: 'post',
        data
    })
}
// 根据学号编辑学生信息
export function editStudentById(id) {
    return request({
        url: `/admin/editStudentById/${id}`,
        method: 'post'
    })
}
//  编辑提交
export function editStudentSubmit(id, data) {
    return request({
        url: `/admin/editStudentSubmit/${id}`,
        method: 'post',
        data
    })
}
// 根据学号删除学生
export function delStudentById(id) {
    return request({
        url: `/admin/delStudentById/${id}`,
        method: 'get'
    })
}
// 添加提交
export function addStudentSubmit(data) {
    return request({
        url: `/admin/addStudentSubmit`,
        method: 'post',
        data
    })
}
// excel导出所有学生信息
export function getAllStudentsByExcel() {
    return request({
        url: `/admin/getAllStudentsByExcel`,
        method: 'get',
    })
}