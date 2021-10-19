/**
 * 登录页面模块封装
 */
var express = require('express');
var router = express.Router();
const db = require('../db/index');
const common = require('../common/index');

// 登录
router.post('/login', function (req, res) {
    let { username, password } = req.body;
    let sql = 'select * from user_login where id = ?';
    db.query(sql, [username], function (err, result) {
        if (err) {
            console.log('登录时查询数据库出错');
            return
        } else {
            if (result.length == 0) {
                res.json({
                    status: 404,
                    msg: '账号不存在！'
                })
            } else if (result[0].password != password) {
                res.json({
                    status: 404,
                    msg: '密码错误！'
                })
            } else {
                let token = common.createToken(username);
                res.json({
                    status: 200,
                    msg: '登录成功！',
                    data: token
                })
            }

        }

    })

})
module.exports = router;