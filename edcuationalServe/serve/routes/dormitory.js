var express = require('express');
var router = express.Router();
const db = require('../db/index');
// 查看报修记录
router.post('/getServiceRecord', function (req, res) {
    let dormitoryId = req.body.dormitory;
    let sql = `select * from dormitory_service where dormitory_id = "${dormitoryId}"`;
    db.query(sql, function (err, result){
        if (err) {
            console.log('获取报修记录信息时数据库查询出错！');
            return
        } else {
            res.send({
                status: 200,
                msg: '获取报修记录信息成功！',
                data: {
                    result
                }
            })
        }
    })
})

module.exports = router;