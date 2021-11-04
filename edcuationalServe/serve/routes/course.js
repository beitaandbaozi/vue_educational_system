var express = require('express');
var router = express.Router();
const db = require('../db/index');
// const jwt = require('jsonwebtoken');

// 获取开设课程信息
router.post('/getSetUpCourse', function (req, res) {
    let query = req.body.query;
    let pagenum = Number(req.body.pagenum);
    let start, pagesize = Number(req.body.pagesize);
    if (pagenum == undefined) {
        pagenum = 1;
        start = 0;
    } else {
        start = (pagenum - 1) * pagesize;
    }
    let sql = '';
    if (query != '') {
        sql = `select *,(select count(*) from class where c_id like '%${query}%') as count from class where c_id  like '%${query}%'`;
        db.query(sql, null, function (err, result) {
            if (err) {
                console.log('搜索关键词时数据库出错' + err);
                return;
            }
            // console.log(result);
            res.send({
                status: 200,
                msg: '搜索关键词时数据库信息成功！',
                data: {
                    result,
                    count:result[0].count
                }
            })
        })
    } else {
        sql = `select *,(select count(*) from class) as count from class limit ?,?`;
        db.query(sql, [start, pagesize], function (err, result) {
            if (err) {
                console.log('获取开设课程信息时数据库出错' + err);
                return
            } else {
                // console.log(result);
                res.send({
                    status: 200,
                    msg: '获取开设课程信息成功！',
                    data: {
                        result,
                        count:result[0].count
                    }
                })
            }
        })
    }
})


module.exports = router;