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
    let sql = `select *,(select count(*) from new) as count from new order by time DESC  limit ?,?`;
    db.query(sql, [start, pagesize], function (err, result) {
        if (err) {
            console.log('获取所有新闻时数据库出错！', err.message)
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
// 发布快讯
router.post('/issueNew', function (req, res) {
    let title = req.body.new_title;
    let depart_feed = req.body.depart_feed;
    let contributor = req.body.contributor;
    let photographer = req.body.photographer;
    let edit = req.body.edit;
    let first_trial = req.body.first_trial;
    let recheck = req.body.recheck;
    let audit = req.body.audit;
    let time = req.body.time;
    let content = req.body.content;
    let sql = 'insert into new (new_title,depart_feed,contributor,photographer,edit,first_trial,recheck,audit,time,content) values(?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, [title, depart_feed, contributor, photographer, edit, first_trial, recheck, audit, time, content], function (err, result) {
        if (err) {
            console.log('添加快讯时数据库出错', err.sqlMessage);
            return
        } else {
            res.send({
                status: 200,
                msg: '添加快讯成功！',
            })
        }
    })
})
// 获取快讯（首页中应用）
router.get('/getNewByLimit', function (req, res) {
    const limit = parseInt(req.query.limit)
    let sql = 'select * from new limit ?';
    db.query(sql, [limit], function (err, result) {
        if (err) {
            console.log('获取快讯（首页中应用）数据库出错', err.message)
            return
        } else {
            // console.log(result)
            res.send({
                status: 200,
                msg: '获取快讯（首页中应用）成功！',
                data: { result }
            })
        }
    })
})
module.exports = router;