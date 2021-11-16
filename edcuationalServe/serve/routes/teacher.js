var express = require('express');
var router = express.Router();
const db = require('../db/index');
const jwt = require('jsonwebtoken');

// 获取教师对应的课程信息
router.post('/getCourse', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = `select sc.cno,class.name,teaching.teacher_id,teaching.teacher_name,teaching.evaluation from teaching join sc on teaching.cno = sc.cno join class on sc.cno = class.c_id where sc.sno = ${name}`;
    db.query(sql, function (err, result) {
        if (err) {
            console.log('获取教师对应课程信息时数据库查询出错！');
            return
        } else {
            console.log(result)
            res.send({
                status: 200,
                msg: '获取教师对应课程信息成功！',
                data: {
                    result
                }
            })
        }
    })
})
// 根据工号获取教师个人信息
router.post('/getTeacherInfo', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    // console.log(name)
    let sql = 'select * from  teacher_info  where num = ?';
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取教师个人信息时数据库查询出错！');
            return
        } else {
            // console.log(result)
            res.send({
                status: 200,
                msg: '获取教师个人信息成功！',
                data: {
                    number: result[0].num,
                    name: result[0].name,
                    duty: result[0].duty,
                    entry_time: result[0].entry_time,
                    hire_form: result[0].hire_form,
                    education_bgc: result[0].education_bgc,
                    native_place: result[0].native_place,
                    politics_status: result[0].politics_status,
                    mobile: result[0].mobile,
                    qq_number: result[0].qq_number,
                    wechat: result[0].wechat,
                    email: result[0].email,
                    address: result[0].address,
                    postal_address: result[0].postal_address,
                    degree_type: result[0].degree_type,
                    graduate_school: result[0].graduate_school,
                    graduate_time: result[0].graduate_time,
                    major: result[0].major,
                }
            })
        }
    })
})

// 获取教师对应工号的课程成绩信息
router.post('/getScore', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    // console.log(name)
    let sql1 = 'select teaching.cno,class.name from teaching  join class on teaching.cno = class.c_id   where teaching.teacher_id = ?';
    let sql2 = 'select sc.sno,sc.grade,student_info.stu_name,student_info.class from sc join student_info on sc.sno = student_info.id where sc.cno = ?';
    db.query(sql1, [name], function (err, result) {
        if (err) {
            console.log('获取教师对应工号的课程信息时数据库查询出错！');
            return
        } else {
            var course = result
            var cno = result[0].cno
            db.query(sql2, [cno], function (err, result) {
                if (err) {
                    console.log('获取教师对应工号的课程的成绩时数据库查询出错')
                    return;
                } else {
                    var grade = result
                    res.send({
                        status: 200,
                        msg: '获取教师对应工号的课程信息成功！',
                        data: {
                            course,
                            grade
                        }
                    })
                }

            })
        }
    })
})

// 获取教师对应工号的课程的成绩信息
router.post('/getScoreByCno/:cno', function (req, res) {
    const cno = req.params.cno
    // console.log(req.body)
    let sql2 = 'select sc.sno,sc.grade,student_info.stu_name,student_info.class from sc join student_info on sc.sno = student_info.id where sc.cno = ?';
    db.query(sql2, [cno], function (err, result) {
        if (err) {
            console.log('获取教师对应工号的课程的成绩时数据库查询出错！');
            return
        } else {
            var grade = result
            // var cno = req.body.cno ? req.body.cno : result[0].cno
            res.send({
                status: 200,
                msg: '获取教师对应工号的课程的成绩信息成功！',
                data: {
                    grade,
                }
            })

        }
    })
})

// 获取教师对应课程的考试时间信息
router.post('/getTestTime', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = `select teaching.cno,class.name,class.duty,class.credit,class.test_time,class.test_room from teaching  join class on teaching.cno = class.c_id  where teacher_id = ? and class.assess like '%考试%'`;
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取教师对应课程的考试时间信息时数据库出错');
            return
        } else {
            res.send({
                status: 200,
                msg: '获取教师对应课程的考试时间信息成功！',
                data: {
                    result
                }
            })
        }
    })

})

// 获取教师对应工号的教学任务信息
router.post('/getTeachingTask', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    // console.log(name)
    let sql1 = 'select teaching.cno,class.name from teaching  join class on teaching.cno = class.c_id   where teaching.teacher_id = ?';
    let sql2 = 'select teaching_tasks.tno, teaching_tasks.cno, teaching_tasks.title, teaching_tasks.content, teaching_tasks.time,class.name from teaching_tasks join class on teaching_tasks.cno = class.c_id where tno = ? and cno = ?';
    db.query(sql1, [name], function (err, result) {
        if (err) {
            console.log('获取教师对应工号的课程信息时数据库查询出错！');
            return
        } else {
            var course = result
            var cno = result[0].cno
            db.query(sql2, [name, cno], function (err, result) {
                if (err) {
                    console.log('获取教师对应工号的课程的教学任务时数据库查询出错')
                    return;
                } else {
                    var teaching_task = result
                    res.send({
                        status: 200,
                        msg: '获取教师对应工号的课程信息成功！',
                        data: {
                            course,
                            teaching_task
                        }
                    })
                }

            })
        }
    })
})
// 获取教师对应工号的课程的教学任务信息
router.post('/getTeachingTaskByCno/:cno', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    const cno = req.params.cno
    // console.log(req.body)
    let sql2 = 'select teaching_tasks.tno, teaching_tasks.cno, teaching_tasks.title, teaching_tasks.content, teaching_tasks.time,class.name from teaching_tasks join class on teaching_tasks.cno = class.c_id where tno = ? and cno = ? ';
    db.query(sql2, [name, cno], function (err, result) {
        if (err) {
            console.log('获取教师对应工号的课程的教学任务信息时数据库查询出错！');
            return
        } else {
            var teaching_task = result
            // var cno = req.body.cno ? req.body.cno : result[0].cno
            res.send({
                status: 200,
                msg: '获取教师对应工号的课程的教学任务信息成功！',
                data: {
                    teaching_task,
                }
            })

        }
    })

})
// 编辑教学任务
router.post('/editTeachingTask/:cno', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    var cno = req.params.cno
    var time = req.body.time
    var title = req.body.title
    var content = req.body.content
    let sql = 'update teaching_tasks set title = ?, content = ? where tno = ? and cno = ? and time = ?';
    db.query(sql,[title,content,name,cno,time],function (err, result){
        if(err){
            console.log('编辑教学任务时数据库查询出错！');
            return
        }else{
            res.send({
                status: 200,
                msg: '修改教学任务信息成功',
                data: {
                    result
                }
            })
        }

    })
    
})
module.exports = router;