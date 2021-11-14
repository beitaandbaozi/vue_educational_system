import request from '@/utils/request'
// 获取教师对应工号的课程成绩信息
export function getScore() {
    return request({
        url: '/teacher/getScore',
        method: 'post'
    })
}
// 获取教师对应工号的课程的成绩信息
export function getScoreByCno(cno) {
    return request({
        url: `/teacher/getScoreByCno/${cno}`,
        method: 'post',
        
    })
}
