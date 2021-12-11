import request from '@/utils/request'
// 导入学生
export function importStudents(data){
    return request({
        url:'/admin/importStudents',
        method: 'post',
        data
    })
}
// 导入教师
export function importTeachers(data){
    return request({
        url:'/admin/importTeachers',
        method: 'post',
        data
    })
}