var express = require('express');
var router = express.Router();
const db = require('../db/index');
const jwt = require('jsonwebtoken');

router.post('/getSubCost', function (req, res) {
    let { authorization } = req.headers
    const tokenData = jwt.decode(authorization.split(' ')[1].slice(0, -1));
    const { name } = tokenData;
    let sql = 'select * from submit_cost where num = ? order by academic desc';
    db.query(sql, [name], function (err, result) {
        if (err) {
            console.log('获取交费记录时数据库查询出错！');
            return
        } else {
            // console.log(result)
            res.send({
                status: 200,
                msg: '获取交费记录成功！',
                data: {
                    result
                }
            })
        }
    })

})


module.exports = router;