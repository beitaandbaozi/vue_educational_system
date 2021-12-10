var express = require('express');
var router = express.Router();
const db = require('../db/index');
/**
 * 学生列表端
 */
// 获取全部学生信息
router.post('/getAllStudents', function (req, res) {
    let query = req.body.query;
    let pagenum = Number(req.body.pagenum);
    let start, pagesize = Number(req.body.pagesize);
    console.log(pagenum, pagesize)
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
            if (result.length == 0) {
                res.send({
                    status: 400,
                    msg: '没有找到该学号学生',
                    data: {
                        count: 0
                    }
                })
            } else {
                res.send({
                    status: 200,
                    msg: '搜索关键词时数据库信息成功！',
                    data: {
                        result,
                        count: result[0].count
                    }
                })
            }

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
    } else if (duty == '' && grad != '') {
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
// 根据学号获取对应学生的信息
router.post('/editStudentById/:id', function (req, res) {
    let num = req.params.id
    let sql = 'select * from student_info where id = ?';
    db.query(sql, [num], function (err, result) {
        if (err) {
            console.log('根据学号获取对应学生的信息时数据库出错！')
            return
        } else {
            res.send({
                status: 200,
                msg: '根据学号获取对应学生的信息成功！',
                data: {
                    result: result[0],
                }
            })

        }
    })
})
// 编辑提交操作
router.post('/editStudentSubmit/:id', function (req, res) {
    let num = req.params.id;
    let name = req.body.stu_name;
    let grad = req.body.grad;
    let classes = req.body.class;
    let major = req.body.major;
    let idCard = req.body.idCard;
    let email = req.body.email;
    let advisor = req.body.advisor;
    let counsellor = req.body.counsellor;
    let dormitory = req.body.dormitory;
    let avator = req.body.avator;
    let duty = req.body.duty;
    let sql = 'update  student_info  set stu_name=?,grad=?,class=?,major=?,idCard=?,email=?,advisor=?,counsellor=?,dormitory=?,avator=?,duty=?  where id =?';
    db.query(sql, [name, grad, classes, major, idCard, email, advisor, counsellor, dormitory, avator, duty, num], function (err, result) {
        if (err) {
            console.log('编辑提交操作时数据库出错！')
            return
        } else {
            res.send({
                status: 200,
                msg: '编辑提交操作时数据库成功！'
            })
        }

    })
})
// 根据学号删除学生
router.get('/delStudentById/:id', function (req, res) {
    let num = req.params.id;
    let sql = 'delete from student_info where id = ?';
    db.query(sql, [num], function (err, result) {
        if (err) {
            console.log('根据学号删除学生数据库出错!')
            return;
        } else {
            res.send({
                status: 200,
                msg: '根据学号删除学生数据库成功！',
            })
        }
    })

})
// 添加学生
router.post('/addStudentSubmit', function (req, res) {
    let id = req.body.id;
    let stu_name = req.body.stu_name;
    let grad = req.body.grad;
    let classes = req.body.class;
    let major = req.body.major;
    let email = req.body.email;
    let idCard = req.body.idCard;
    let advisor = req.body.advisor;
    let counsellor = req.body.counsellor;
    let dormitoryId = req.body.dormitoryId;
    let duty = req.body.duty;
    let sql = 'insert into student_info (id,stu_name,grad,class,major,idCard,email,advisor,counsellor,dormitory,duty) values(?,?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, [id, stu_name, grad, classes, major, email, idCard, advisor, counsellor, dormitoryId, duty], function (err, result) {
        if (err) {
            console.log('添加学生时数据库出错');
            return
        } else {
            res.send({
                status: 200,
                msg: '添加学生成功！'
            })
        }
    })
})
// 使用excel导入学生
router.post('/importStudents', function (req, res) {
    const studentsList = req.body;
    for (var i = 0; i < studentsList.length; i++) {
        let id = studentsList[i].id;
        let stu_name = studentsList[i].stu_name;
        let grad = studentsList[i].grad;
        let classes = studentsList[i].class;
        let major = studentsList[i].major;
        let idCard = studentsList[i].idCard;
        let email = studentsList[i].email;
        let advisor = studentsList[i].advisor;
        let counsellor = studentsList[i].counsellor;
        let dormitoryId = studentsList[i].dormitoryId;
        let duty = studentsList[i].duty;
        let sql = 'insert into student_info (id,stu_name,grad,class,major,idCard,email,advisor,counsellor,dormitory,duty) values(?,?,?,?,?,?,?,?,?,?,?)';
        db.query(sql, [id, stu_name, grad, classes, major, email, idCard, advisor, counsellor, dormitoryId, duty], function (err, result) {
            if (err) {
                console.log('导入excel学生时数据库出错', err);
                return
            }
        })
    }
    res.json({
        status: 200,
        msg: '导入excel学生成功！'
    })

})
// excel获取所有学生信息
router.get('/getAllStudentsByExcel', function (req, res) {
    let sql = 'select * from student_info';
    db.query(sql, function (err, result) {
        if (err) {
            console.log('excel获取所有学生信息时数据库出错')
            return
        } else {
            res.send({
                status: 200,
                msg: '获取excel获取所有学生信息数据库信息成功！',
                data: {
                    result,
                }
            })
        }
    })
})
/**
 * 教师列表端
 */
// 获取全部教师信息
router.post('/getAllTeachers', function (req, res) {
    let query = req.body.query;
    let pagenum = Number(req.body.pagenum);
    let start, pagesize = Number(req.body.pagesize);
    console.log(pagenum, pagesize)
    if (pagenum == undefined) {
        pagenum = 1;
        start = 0;
    } else {
        start = (pagenum - 1) * pagesize;
    }
    let sql = '';
    if (query != '') {
        sql = `select *,(select count(*) from teacher_info where num = '${query}') as count from teacher_info where num  like '${query}'`;
        db.query(sql, null, function (err, result) {
            if (err) {
                console.log('搜索关键词时数据库出错' + err.message);
                return;
            }
            if (result.length == 0) {
                res.send({
                    status: 400,
                    msg: '没有找到该工号教师',
                    data: {
                        count: 0
                    }
                })
            } else {
                res.send({
                    status: 200,
                    msg: '搜索关键词时数据库信息成功！',
                    data: {
                        result,
                        count: result[0].count
                    }
                })
            }

        })
    } else {
        sql = `select *,(select count(*) from teacher_info) as count from teacher_info limit ?,?`;
        db.query(sql, [start, pagesize], function (err, result) {
            if (err) {
                console.log('管理员获取全部教师时数据库出错' + err.message);
                return
            } else {
                // console.log(result);
                res.send({
                    status: 200,
                    msg: '管理员获取全部教师成功！',
                    data: {
                        result,
                        count: result[0].count
                    }
                })
            }
        })
    }
})

// 通过工号获取对应教师的信息
router.get('/getTeacherByNum/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'select * from teacher_info where num = ?';
    db.query(sql, [id], function (err, result) {
        if (err) {
            console.log('通过工号获取对应教师信息时数据库出错', err.message);
            return
        } else {
            res.send({
                status: 200,
                msg: '通过工号获取对应教师信息成功！',
                data: {
                    result: result[0]
                }
            })

        }

    })

})

// 编辑教师信息提交
router.post('/editTeacherSubmit/:id', function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let sex = req.body.sex;
    let duty = req.body.duty;
    let hire_form = req.body.hire_form;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let sql = 'update  teacher_info set name=?,sex=?,duty=?,hire_form=?,mobile=?,email=? where num = ?';
    db.query(sql, [name, sex, duty, hire_form, mobile, email, id], function (err, result) {
        if (err) {
            console.log('编辑教师信息提交时数据库出错', err.message);
            return
        } else {
            res.send({
                status: 200,
                msg: '编辑教师信息成功！'
            })
        }

    })
})

// 通过工号删除对应教师信息
router.get('/delTeacherByNum/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'delete from teacher_info where num =?';
    db.query(sql, [id], function (err, result) {
        if (err) {
            console.log('通过工号删除对应教师信息时数据库出错', err.message);
            return
        } else {
            res.send({
                status: 200,
                msg: '通过工号删除对应教师信息成功！'
            })
        }
    })
})

// 添加教师
router.post('/addTeacher', function (req, res) {
    let num = req.body.num;
    let name = req.body.name;
    let sex = req.body.sex;
    let duty = req.body.duty;
    let entry_time = req.body.entry_time;
    let hire_form = req.body.hire_form;
    let education_bgc = req.body.education_bgc;
    let native_place = req.body.native_place;
    let politics_status = req.body.politics_status;
    let mobile = req.body.mobile;
    let qq_number = req.body.qq_number;
    let wechat = req.body.wechat;
    let email = req.body.email;
    let address = req.body.address;
    let postal_address = req.body.postal_address;
    let degree_type = req.body.degree_type;
    let graduate_school = req.body.graduate_school;
    let graduate_time = req.body.graduate_time;
    let major = req.body.major;
    let sql = `insert into teacher_info(num,name,sex,duty,entry_time,hire_form,
        education_bgc,native_place,politics_status,mobile,qq_number,wechat,email,
        address,postal_address,degree_type,graduate_school,graduate_time,major) values
        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.query(sql, [num, name, sex, duty, entry_time, hire_form, education_bgc, native_place, politics_status, mobile, qq_number, wechat, email, address, postal_address, degree_type, graduate_school, graduate_time, major], function (err, result) {
        if (err) {
            console.log('添加教师时数据库出错', err.message)
            return;
        }else{
            res.send({
                status: 200,
                msg: '添加教师成功!'
            })
        }
    })
})
module.exports = router;