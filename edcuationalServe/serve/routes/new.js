var express = require('express');
var router = express.Router();
const db = require('../db/index');

router.post('/getAllNew', function (req, res) {
    let pagenum = Number(req.body.pagenum);
    let start, pagesize = Number(req.body.pagesize);
    if (pagenum == undefined) {
        pagenum = 1;
        start = 0;
    } else {
        start = (pagenum - 1) * pagesize;
    }
    let sql = `select *,(select count(*) from new) as count from new limit ?,?`;
    db.query(sql, [start, pagesize], function (err, result) {
        if (err) {
            console.log('获取所有新闻时数据库出错！')
            return
        } else {
            res.send({
                status: 200,
                msg: '获取所有新闻成功！',
                data: {
                    result,
                    count: result[0].count
                }
            })
        }
    })
})

module.exports = router;