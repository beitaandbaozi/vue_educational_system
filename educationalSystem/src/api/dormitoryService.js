import request from '@/utils/request'
export function getServiceRecord(data){
    return request({
        url: '/dormitory/getServiceRecord',
        method: 'post',
        data
    })
}