import request from '@/utils/request'
export function getSubCost(){
    return request({
        url:'/student/getSubCost',
        method: 'post'
    })
}