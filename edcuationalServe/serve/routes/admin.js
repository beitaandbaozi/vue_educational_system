var express = require('express');
var router = express.Router();
const db = require('../db/index');
// 获取全部学生信息
router.post('/getAllStudents', function (req, res) {
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
        sql = `select *,(select count(*) from student_info where id = '${query}') as count from student_info where id  like '${query}'`;
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
        sql = `select *,(select count(*) from student_info) as count from student_info limit ?,?`;
        db.query(sql, [start, pagesize], function (err, result) {
            if (err) {
                console.log('管理员获取全部学生时数据库出错' + err);
                return
            } else {
                // console.log(result);
                res.send({
                    status: 200,
                    msg: '管理员获取全部学生成功！',
                    data: {
                        result,
                        count: result[0].count
                    }
                })
            }
        })
    }
})
// 获取全部系别
router.get('/getAllDuty', function (req, res) {
    let sql = 'select distinct duty from student_info';
    db.query(sql, function (err, result) {
        if (err) {
            console.log('获取全部系别信息时数据库出错！')
            return
        } else {
            res.send({
                status: 200,
                msg: '获取全部系别信息时数据库信息成功！',
                data: {
                    result,
                }
            })
        }

    })
})
// 根据系别和学年获取学生数据
router.post('/searchByStudents', function (req, res) {
    var grad = req.body.gradValue;
    var duty = req.body.dutyValue;
    // console.log(grad)
    // console.log(duty)
    let sql = '';
    if (grad == '' && duty != '') {
        sql = `select *,(select count(*) from student_info where duty = '${duty}') as count from student_info where duty = '${duty}'`
    } else if (duty == '' && grad != '' ) {
        sql = `select *,(select count(*) from student_info where grad = '${grad}') as count from student_info where grad = '${grad}'`
    } else if (duty == '' && grad == '') {
        sql = 'select *,(select count(*) from student_info) as count from student_info limit 1,10'
    } else {
        sql = `select *,(select count(*) from student_info where grad = '${grad}' and duty = '${duty}' ) as count from student_info where grad = '${grad}' and duty = '${duty}'`
    }
    // console.log(sql)
    db.query(sql, function (err, result) {
        if (err) {
            console.log('根据系别和学年查询学生数据时数据库出错！')
            return
        } else {
            // console.log(result)
            res.send({
                status: 200,
                msg: '获取全部系别信息时数据库信息成功！',
                data: {
                    result,
                    count: result[0].count
                }

            })
        }

    })

})
module.exports = router;