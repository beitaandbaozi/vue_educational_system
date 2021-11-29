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
export function getAllDuty(){
    return request({
        url: '/admin/getAllDuty',
        method: 'get',
    })
}
// 根据学年和系别查询数据
export function searchByStudents(data){
    return request({
        url: '/admin/searchByStudents',
        method: 'post',
        data
    })
}
// 根据学号编辑学生信息
export function editStudentById(id){
    return request({
        url:`/admin/editStudentById/${id}`,
        method: 'post'
    })

}