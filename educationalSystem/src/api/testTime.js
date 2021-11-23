import request from '@/utils/request'
export function getTestTime(){
    return request({
        url:'student/getTestTime',
        method: 'post'
    })
}