import request from '@/utils/request'
export function getAllNew(data) {
    return request({
        url:'/new/getAllNew',
        method: 'post',
        data
    })
}