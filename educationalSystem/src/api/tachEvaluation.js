import request from '@/utils/request'
// 获取课程以及对应的教师信息
export function getCourse(){
    return request({
        url:'/teacher/getCourse',
        match:'post'
    })
}