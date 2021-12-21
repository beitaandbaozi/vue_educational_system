const Koa = require('koa')
const serve = require('koa-static');

const app = new Koa();
app.use(serve(__dirname + "/public")); //将public下的代码静态化
app.listen(3333, () => {
    console.log('广软教务管理系统启动成功！','http://127.0.0.1:3333')
})