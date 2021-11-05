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

module.exports = router;