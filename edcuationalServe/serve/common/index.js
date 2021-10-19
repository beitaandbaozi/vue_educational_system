const jwt = require('jsonwebtoken')
module.exports = {
    createToken: function (name) { //创建Token
        const token = jwt.sign({ name }, "secret", {
            expiresIn: '3600s' // 过期时间
        });
        //console.log(token);
        return token;
    },
    checkToken: function (token) { //从请求中 检查token的状态信息
        try {
            let data = jwt.verify(token, 'secret')
            return {
                token: true,
                res: data.name
            }
        } catch (e) {
            return {
                token: false,
                res: 'err'
            }
        }
    }
}