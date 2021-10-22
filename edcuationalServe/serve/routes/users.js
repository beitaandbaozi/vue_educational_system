var express = require('express');
var router = express.Router();
const db = require('../db/index');
const jwt = require('jsonwebtoken')

/* 获取旧密码 */
router.post('/updatePassword', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = 'select password from user_login where id = ?';
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取旧密码时数据库查询出错！');
            return
        } else {
            res.send({
                status: 200,
                msg: '获取旧密码成功！',
                data: {
                    password:result[0].password
                }
            })
        }
    })
});

// 提交修改密码
router.post('/commitPassword', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    const {newPassword} = req.body;
    let sql = 'update user_login set password = ? where id = ?';
    db.query(sql, [newPassword,name], function (err, result) {
        if (err) {
            console.log('提交修改密码时数据库查询出错！');
            return
        } else {
            res.send({
                status: 200,
                msg: '提交修改密码成功！'
            })
        }
    })
});

module.exports = router;
