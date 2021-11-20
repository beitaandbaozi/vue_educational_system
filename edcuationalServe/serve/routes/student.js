var express = require('express');
var router = express.Router();
const db = require('../db/index');
const jwt = require('jsonwebtoken')

// 获取学生个人信息
router.post('/getStuInfo', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = 'select * from  student_info where id = ?';
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取学生个人信息时数据库查询出错！');
            return
        } else {
            res.send({
                status: 200,
                msg: '获取学生个人信息成功！',
                data: {
                    number: result[0].id,
                    name: result[0].stu_name,
                    grad: result[0].grad,
                    class: result[0].class,
                    major: result[0].major,
                    idCard: result[0].idCard,
                    email: result[0].email,
                    advisor: result[0].advisor,
                    counsellor: result[0].counsellor,
                    dormitory: result[0].dormitory
                }
            })
        }
    })
})
// 获取学生必修课信息
router.post('/getRequireCourseInfo', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = `select sc.cno, sc.grade, sc.gradepo, sc.time,sc.class_type,sc.academic,class.name,class.credit,class.assess,class.type  from	sc join class on  sc.cno = class.c_id where sc.class_type  like "%必修%" and sc.sno = ?`;
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取学生必修课信息时数据库查询出错！');
            return
        } else {
            console.log(result)
            res.send({
                status: 200,
                msg: '获取学生必修课信息成功！',
                data: {
                    result
                }
            })
        }
    })
})
// 获取学生选修课信息
router.post('/getOptionalCourseInfo', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = `select sc.cno, sc.grade, sc.gradepo, sc.time,sc.class_type,sc.academic,class.name,class.credit,class.assess  from sc join class on  sc.cno = class.c_id where sc.class_type  like "%选修%" and sc.sno = ?`;
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取学生选修课信息时数据库查询出错！');
            return
        } else {
            // console.log(result)
            res.send({
                status: 200,
                msg: '获取学生选修课信息成功！',
                data: {
                    result
                }
            })
        }
    })
})
// 获取学生的课程通知（首页中应用）
router.post('/getTeachingTaskByStu', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    const limit = parseInt(req.query.limit)
    let sql = 'select teaching_tasks.title,teaching_tasks.title,teaching_tasks.content,teaching_tasks.time,teaching_tasks.cno from teaching_tasks join sc on sc.cno = teaching_tasks.cno where sc.sno = ? limit  ?';
    db.query(sql, [name,limit], function (err, result) {
        if (err) {
            console.log('获取学生的课程通知（首页中应用）数据库出错！')
            return
        } else {
            var teaching_task = result
            res.send({
                status: 200,
                msg: '获取学生的课程通知（首页中应用）信息成功！',
                data: {
                    teaching_task
                }
            })
        }
    })
})

module.exports = router;
