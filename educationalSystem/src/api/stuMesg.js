import request from '@/utils/request'
// 获取学生个人信息
export function getStuInfo() {
    return request({
        url: '/student/getStuInfo',
        method: 'post'
    })

}
