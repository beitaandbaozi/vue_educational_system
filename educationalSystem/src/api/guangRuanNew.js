import request from '@/utils/request'
// 获取全部快讯
export function getAllNew(data) {
    return request({
        url: '/new/getAllNew',
        method: 'post',
        data
    })
}
// 根据id获取对应的快讯
export function getNewById(id) {
    return request({
        url: `/new/getNewById/${id}`,
        method: 'get'
    })
}
// 发布快讯
export function issueNew(data){
    return request({
        url:'/new/issueNew',
        method: 'post',
        data
    })
}