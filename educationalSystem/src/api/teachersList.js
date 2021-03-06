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
export function getTeacherByNum(id) {
    return request({
        url: `/admin/getTeacherByNum/${id}`,
        method: 'get'
    })
}
// 编辑教师信息提交
export function editTeacherSubmit(id, data) {
    return request({
        url: `/admin/editTeacherSubmit/${id}`,
        method: 'post',
        data
    })
}
// 通过工号删除教师
export function delTeacherByNum(id) {
    return request({
        url: `/admin/delTeacherByNum/${id}`,
        method: 'get'
    })
}
// 添加教师
export function addTeacher(data) {
    return request({
        url: '/admin/addTeacher',
        method: 'post',
        data
    })
}
// 详情页中保存教师信息
export function saveTeacherInfo(data) {
    return request({
        url: '/admin/saveTeacherInfo',
        method: 'post',
        data
    })
}

// excel导出所有教师信息
export function getAllTeachersByExcel(){
    return request({
        url:'/admin/getAllTeachersByExcel',
        method: 'get',
    })
}