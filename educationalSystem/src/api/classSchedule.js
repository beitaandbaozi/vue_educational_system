import request from '@/utils/request'
export function getClassSchedule(data){
    return request({
        url: '/schedule/getClassSchedule',
        method: 'post',
        data
    })
}