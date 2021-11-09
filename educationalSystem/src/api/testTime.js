import request from '@/utils/request'
export function getTestTime(){
    return request({
        url:'testTime/getTestTime',
        method: 'post'
    })
}