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
                    number:result[0].num,
                    name:result[0].name,
                    duty:result[0].duty,
                    entry_time:result[0].entry_time,
                    hire_form:result[0].hire_form,
                    education_bgc:result[0].education_bgc,
                    native_place:result[0].native_place,
                    politics_status:result[0].politics_status,
                    mobile:result[0].mobile,
                    qq_number:result[0].qq_number,
                    wechat:result[0].wechat,
                    email:result[0].email,
                    address:result[0].address,
                    postal_address:result[0].postal_address,
                    degree_type:result[0].degree_type,
                    graduate_school:result[0].graduate_school,
                    graduate_time:result[0].graduate_time,
                    major:result[0].major,
                }
            })
        }
    })
})

module.exports = router;