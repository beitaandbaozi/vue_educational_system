var express = require('express');
var router = express.Router();
const db = require('../db/index');
const jwt = require('jsonwebtoken');

router.post('/getTestTime', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = `select sc.cno,class.name,class.duty,class.credit,class.test_time,class.test_room from sc join class on sc.cno = class.c_id where sc.sno = ${name} and class.assess like '%考试%'`;
    db.query(sql, function (err, result) {
        if (err) {
            console.log('获取学号对应课程考试时间时数据库查询出错！');
            return
        } else {
            console.log(result)
            res.send({
                status: 200,
                msg: '获取学号对应课程考试时间成功！',
                data: {
                    result
                }
            })
        }
    })
})


module.exports = router;