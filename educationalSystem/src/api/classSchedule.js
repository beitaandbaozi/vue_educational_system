import request from '@/utils/request'
export function getClassSchedule(data){
    return request({
        url: '/student/getClassSchedule',
        method: 'post',
        data
    })
}