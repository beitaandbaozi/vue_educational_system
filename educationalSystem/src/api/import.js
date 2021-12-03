import request from '@/utils/request'
export function importStudents(data){
    return request({
        url:'/admin/importStudents',
        method: 'post',
        data
    })

}