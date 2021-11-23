import request from '@/utils/request'
export function getServiceRecord(data){
    return request({
        url: '/student/getServiceRecord',
        method: 'post',
        data
    })
}
