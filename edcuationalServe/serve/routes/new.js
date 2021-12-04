var express = require('express');
var router = express.Router();
const db = require('../db/index');

// 获取全部的新闻信息
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
// 根据id获取对应的新闻信息
router.get('/getNewById/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'select * from new where id = ?';
    db.query(sql, [id], function (err, result) {
        if (err) {
            console.log('根据id获取对应的新闻信息时数据库出错');
            return
        } else {
            res.send({
                status: 200,
                msg: '根据id获取对应的新闻信息成功！',
                data: {
                    result,
                }
            })
        }

    })

})
module.exports = router;