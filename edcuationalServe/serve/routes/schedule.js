var express = require('express');
var router = express.Router();
const db = require('../db/index');
router.post('/getClassSchedule', function (req, res) {
    console.log(req.body)
    let year = req.body.year;
    console.log(year)
    let term = req.body.term;
    console.log(term)
    let sql = `select * from class_schedule where school_year = ${year} and  term = ${term}`;
    db.query(sql, function (err, result){
        if (err) {
            console.log('获取对应学年和学期时课程表数据库查询出错！');
            return
        } else {
            console.log(result)
            res.send({
                status: 200,
                msg: '获取对应学年和学期时课程表信息成功！',
                data: {
                    result
                }
            })
        }
    })

})
module.exports = router;