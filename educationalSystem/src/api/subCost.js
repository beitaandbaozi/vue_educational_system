import request from '@/utils/request'
export function getSubCost(){
    return request({
        url:'/cost/getSubCost',
        method: 'post'
    })
}