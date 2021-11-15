import request from '@/utils/request'
export function getTestTime(){
    return request({
        url:'/teacher/getTestTime',
        method:'post'
    })
}