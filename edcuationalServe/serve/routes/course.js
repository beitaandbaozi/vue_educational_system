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
                    count: result[0].count
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
                        count: result[0].count
                    }
                })
            }
        })
    }
})
// 根据课程代码获取对应的课程资料
router.get('/getSetUpCourse/:id', function (req, res) {
    let id = req.params.id;
    let sql = `select distinct * from class where c_id like '%${id}%'`;
    db.query(sql, function (err, result) {
        if (err) {
            console.log('根据课程代码获取对应的课程资料信息时数据库出错');
            return
        } else {
            // console.log(result)
            res.send({
                status: 200,
                msg: '根据课程代码获取对应的课程资料信息成功！',
                data: {
                    result: result[0],
                }
            })
        }
    })

})
// 编辑课程信息提交
router.post('/editCouresSubmit/:id', function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let credit = req.body.credit;
    let assess = req.body.assess;
    let duty = req.body.duty;
    let class_type = req.body.class_type;
    let intro = req.body.intro;
    let sql = 'update class set name=?,credit=?,class_type=?,intro=? where c_id=?';
    db.query(sql, [name, credit, assess, duty, class_type, intro, id], function (err, result) {
        if (err) {
            console.log('编辑课程信息提交时数据库出错！')
            return
        } else {
            res.send({
                status: 200,
                msg: '编辑课程信息提交时信息成功！',
            })
        }
    })

})
module.exports = router;