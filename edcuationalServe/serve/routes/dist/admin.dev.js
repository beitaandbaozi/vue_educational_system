"use strict";

var express = require('express');

var router = express.Router();

var db = require('../db/index');
/**
 * 学生列表端
 */
// 获取全部学生信息


router.post('/getAllStudents', function (req, res) {
  var query = req.body.query;
  var pagenum = Number(req.body.pagenum);
  var start,
      pagesize = Number(req.body.pagesize);
  console.log(pagenum, pagesize);

  if (pagenum == undefined) {
    pagenum = 1;
    start = 0;
  } else {
    start = (pagenum - 1) * pagesize;
  }

  var sql = '';

  if (query != '') {
    sql = "select *,(select count(*) from student_info where id = '".concat(query, "') as count from student_info where id  like '").concat(query, "'");
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
        });
      } else {
        res.send({
          status: 200,
          msg: '搜索关键词时数据库信息成功！',
          data: {
            result: result,
            count: result[0].count
          }
        });
      }
    });
  } else {
    sql = "select *,(select count(*) from student_info) as count from student_info limit ?,?";
    db.query(sql, [start, pagesize], function (err, result) {
      if (err) {
        console.log('管理员获取全部学生时数据库出错' + err);
        return;
      } else {
        // console.log(result);
        res.send({
          status: 200,
          msg: '管理员获取全部学生成功！',
          data: {
            result: result,
            count: result[0].count
          }
        });
      }
    });
  }
}); // 获取全部系别

router.get('/getAllDuty', function (req, res) {
  var sql = 'select distinct duty from student_info';
  db.query(sql, function (err, result) {
    if (err) {
      console.log('获取全部系别信息时数据库出错！');
      return;
    } else {
      res.send({
        status: 200,
        msg: '获取全部系别信息时数据库信息成功！',
        data: {
          result: result
        }
      });
    }
  });
}); // 根据系别和学年获取学生数据

router.post('/searchByStudents', function (req, res) {
  var pagenum = Number(req.body.pagenum);
  var start,
      pagesize = Number(req.body.pagesize);

  if (pagenum == undefined) {
    pagenum = 1;
    start = 0;
  } else {
    start = (pagenum - 1) * pagesize;
  }

  var grad = req.body.gradValue;
  var duty = req.body.dutyValue;
  console.log(pagenum);
  var sql = '';

  if (grad == '' && duty != '') {
    sql = "select *,(select count(*) from student_info where duty = '".concat(duty, "') as count from student_info where duty = '").concat(duty, "' limit ?,?");
  } else if (duty == '' && grad != '') {
    sql = "select *,(select count(*) from student_info where grad = '".concat(grad, "') as count from student_info where grad = '").concat(grad, "' limit ?,?");
  } else if (duty == '' && grad == '') {
    sql = 'select *,(select count(*) from student_info) as count from student_info limit ?,?';
  } else {
    sql = "select *,(select count(*) from student_info where grad = '".concat(grad, "' and duty = '").concat(duty, "' ) as count from student_info where grad = '").concat(grad, "' and duty = '").concat(duty, "' limit ?,?");
  } // console.log(sql)


  db.query(sql, [start, pagesize], function (err, result) {
    if (err) {
      console.log('根据系别和学年查询学生数据时数据库出错！');
      return;
    } else {
      res.send({
        status: 200,
        msg: '获取全部系别信息时数据库信息成功！',
        data: {
          result: result,
          count: result[0].count
        }
      });
    }
  });
}); // 根据学号获取对应学生的信息

router.post('/editStudentById/:id', function (req, res) {
  var num = req.params.id;
  var sql = 'select * from student_info where id = ?';
  db.query(sql, [num], function (err, result) {
    if (err) {
      console.log('根据学号获取对应学生的信息时数据库出错！');
      return;
    } else {
      res.send({
        status: 200,
        msg: '根据学号获取对应学生的信息成功！',
        data: {
          result: result[0]
        }
      });
    }
  });
}); // 编辑提交操作

router.post('/editStudentSubmit/:id', function (req, res) {
  var num = req.params.id;
  var name = req.body.stu_name;
  var grad = req.body.grad;
  var classes = req.body["class"];
  var major = req.body.major;
  var idCard = req.body.idCard;
  var email = req.body.email;
  var advisor = req.body.advisor;
  var counsellor = req.body.counsellor;
  var dormitory = req.body.dormitory;
  var avator = req.body.avator;
  var duty = req.body.duty;
  var sql = 'update  student_info  set stu_name=?,grad=?,class=?,major=?,idCard=?,email=?,advisor=?,counsellor=?,dormitory=?,avator=?,duty=?  where id =?';
  db.query(sql, [name, grad, classes, major, idCard, email, advisor, counsellor, dormitory, avator, duty, num], function (err, result) {
    if (err) {
      console.log('编辑提交操作时数据库出错！');
      return;
    } else {
      res.send({
        status: 200,
        msg: '编辑提交操作时数据库成功！'
      });
    }
  });
}); // 根据学号删除学生

router.get('/delStudentById/:id', function (req, res) {
  var num = req.params.id;
  var sql = 'delete from student_info where id = ?';
  db.query(sql, [num], function (err, result) {
    if (err) {
      console.log('根据学号删除学生数据库出错!');
      return;
    } else {
      res.send({
        status: 200,
        msg: '根据学号删除学生数据库成功！'
      });
    }
  });
}); // 添加学生

router.post('/addStudentSubmit', function (req, res) {
  var id = req.body.id;
  var stu_name = req.body.stu_name;
  var grad = req.body.grad;
  var classes = req.body["class"];
  var major = req.body.major;
  var email = req.body.email;
  var idCard = req.body.idCard;
  var advisor = req.body.advisor;
  var counsellor = req.body.counsellor;
  var dormitoryId = req.body.dormitoryId;
  var duty = req.body.duty;
  var sql = 'insert into student_info (id,stu_name,grad,class,major,idCard,email,advisor,counsellor,dormitory,duty) values(?,?,?,?,?,?,?,?,?,?,?)';
  db.query(sql, [id, stu_name, grad, classes, major, email, idCard, advisor, counsellor, dormitoryId, duty], function (err, result) {
    if (err) {
      console.log('添加学生时数据库出错');
      return;
    } else {
      res.send({
        status: 200,
        msg: '添加学生成功！'
      });
    }
  });
}); // 使用excel导入学生

router.post('/importStudents', function (req, res) {
  var studentsList = req.body;

  for (var i = 0; i < studentsList.length; i++) {
    var id = studentsList[i].id;
    var stu_name = studentsList[i].stu_name;
    var grad = studentsList[i].grad;
    var classes = studentsList[i]["class"];
    var major = studentsList[i].major;
    var idCard = studentsList[i].idCard;
    var email = studentsList[i].email;
    var advisor = studentsList[i].advisor;
    var counsellor = studentsList[i].counsellor;
    var dormitoryId = studentsList[i].dormitoryId;
    var duty = studentsList[i].duty;
    var sql = 'insert into student_info (id,stu_name,grad,class,major,idCard,email,advisor,counsellor,dormitory,duty) values(?,?,?,?,?,?,?,?,?,?,?)';
    db.query(sql, [id, stu_name, grad, classes, major, email, idCard, advisor, counsellor, dormitoryId, duty], function (err, result) {
      if (err) {
        console.log('导入excel学生时数据库出错', err);
        return;
      }
    });
  }

  res.json({
    status: 200,
    msg: '导入excel学生成功！'
  });
}); // excel获取所有学生信息

router.get('/getAllStudentsByExcel', function (req, res) {
  var sql = 'select * from student_info';
  db.query(sql, function (err, result) {
    if (err) {
      console.log('excel获取所有学生信息时数据库出错');
      return;
    } else {
      res.send({
        status: 200,
        msg: '获取excel获取所有学生信息数据库信息成功！',
        data: {
          result: result
        }
      });
    }
  });
});
/**
 * 教师列表端
 */
// 获取全部教师信息

router.post('/getAllTeachers', function (req, res) {
  var query = req.body.query;
  var pagenum = Number(req.body.pagenum);
  var start,
      pagesize = Number(req.body.pagesize);
  console.log(pagenum, pagesize);

  if (pagenum == undefined) {
    pagenum = 1;
    start = 0;
  } else {
    start = (pagenum - 1) * pagesize;
  }

  var sql = '';

  if (query != '') {
    sql = "select *,(select count(*) from teacher_info where num = '".concat(query, "') as count from teacher_info where num  like '").concat(query, "'");
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
        });
      } else {
        res.send({
          status: 200,
          msg: '搜索关键词时数据库信息成功！',
          data: {
            result: result,
            count: result[0].count
          }
        });
      }
    });
  } else {
    sql = "select *,(select count(*) from teacher_info) as count from teacher_info limit ?,?";
    db.query(sql, [start, pagesize], function (err, result) {
      if (err) {
        console.log('管理员获取全部教师时数据库出错' + err.message);
        return;
      } else {
        // console.log(result);
        res.send({
          status: 200,
          msg: '管理员获取全部教师成功！',
          data: {
            result: result,
            count: result[0].count
          }
        });
      }
    });
  }
}); // 通过工号获取对应教师的信息

router.get('/getTeacherByNum/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'select * from teacher_info where num = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      console.log('通过工号获取对应教师信息时数据库出错', err.message);
      return;
    } else {
      res.send({
        status: 200,
        msg: '通过工号获取对应教师信息成功！',
        data: {
          result: result[0]
        }
      });
    }
  });
}); // 编辑教师信息提交

router.post('/editTeacherSubmit/:id', function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var sex = req.body.sex;
  var duty = req.body.duty;
  var hire_form = req.body.hire_form;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var sql = 'update  teacher_info set name=?,sex=?,duty=?,hire_form=?,mobile=?,email=? where num = ?';
  db.query(sql, [name, sex, duty, hire_form, mobile, email, id], function (err, result) {
    if (err) {
      console.log('编辑教师信息提交时数据库出错', err.message);
      return;
    } else {
      res.send({
        status: 200,
        msg: '编辑教师信息成功！'
      });
    }
  });
}); // 通过工号删除对应教师信息

router.get('/delTeacherByNum/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'delete from teacher_info where num =?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      console.log('通过工号删除对应教师信息时数据库出错', err.message);
      return;
    } else {
      res.send({
        status: 200,
        msg: '通过工号删除对应教师信息成功！'
      });
    }
  });
}); // 添加教师

router.post('/addTeacher', function (req, res) {
  var num = req.body.num;
  var name = req.body.name;
  var sex = req.body.sex;
  var duty = req.body.duty;
  var entry_time = req.body.entry_time;
  var hire_form = req.body.hire_form;
  var education_bgc = req.body.education_bgc;
  var native_place = req.body.native_place;
  var politics_status = req.body.politics_status;
  var mobile = req.body.mobile;
  var qq_number = req.body.qq_number;
  var wechat = req.body.wechat;
  var email = req.body.email;
  var address = req.body.address;
  var postal_address = req.body.postal_address;
  var degree_type = req.body.degree_type;
  var graduate_school = req.body.graduate_school;
  var graduate_time = req.body.graduate_time;
  var major = req.body.major;
  var sql = "insert into teacher_info(num,name,sex,duty,entry_time,hire_form,\n        education_bgc,native_place,politics_status,mobile,qq_number,wechat,email,\n        address,postal_address,degree_type,graduate_school,graduate_time,major) values\n        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sql, [num, name, sex, duty, entry_time, hire_form, education_bgc, native_place, politics_status, mobile, qq_number, wechat, email, address, postal_address, degree_type, graduate_school, graduate_time, major], function (err, result) {
    if (err) {
      console.log('添加教师时数据库出错', err.message);
      return;
    } else {
      res.send({
        status: 200,
        msg: '添加教师成功!'
      });
    }
  });
}); // 详情页中保存教师信息

router.post('/saveTeacherInfo', function (req, res) {
  var num = req.body.num;
  var name = req.body.name;
  var sex = req.body.sex;
  var duty = req.body.duty;
  var entry_time = req.body.entry_time;
  var hire_form = req.body.hire_form;
  var education_bgc = req.body.education_bgc;
  var native_place = req.body.native_place;
  var politics_status = req.body.politics_status;
  var mobile = req.body.mobile;
  var qq_number = req.body.qq_number;
  var wechat = req.body.wechat;
  var email = req.body.email;
  var address = req.body.address;
  var postal_address = req.body.postal_address;
  var degree_type = req.body.degree_type;
  var graduate_school = req.body.graduate_school;
  var graduate_time = req.body.graduate_time;
  var major = req.body.major;
  var sql = "update teacher_info set name=?,sex=?,duty=?,entry_time=?,hire_form=?,education_bgc=?,\n            native_place=?,politics_status=?,mobile=?,qq_number=?,wechat=?,email=?,\n            address=?,postal_address=?,degree_type=?,graduate_school=?,graduate_time=?,\n            major=?where num = ?";
  db.query(sql, [name, sex, duty, entry_time, hire_form, education_bgc, native_place, politics_status, mobile, qq_number, wechat, email, address, postal_address, degree_type, graduate_school, graduate_time, major, num], function (err, result) {
    if (err) {
      console.log('详情页中保存教师信息数据库出错', err.message);
      return;
    } else {
      res.send({
        status: 200,
        msg: '详情页中保存教师信息成功'
      });
    }
  });
}); // excel导出所有教师信息

router.get('/getAllTeachersByExcel', function (req, res) {
  var sql = 'select * from  teacher_info';
  db.query(sql, function (err, result) {
    if (err) {
      console.log('excel导出所有教师信息时数据库出错');
      return;
    } else {
      res.send({
        status: 200,
        msg: '获取excel导出所有教师信息数据库信息成功！',
        data: {
          result: result
        }
      });
    }
  });
}); // excel导入教师信息

router.post('/importTeachers', function (req, res) {
  var teachersList = req.body;

  for (var i = 0; i < teachersList.length; i++) {
    var num = teachersList[i].num;
    var name = teachersList[i].name;
    var sex = teachersList[i].sex;
    var duty = teachersList[i].duty;
    var entry_time = teachersList[i].entry_time;
    var hire_form = teachersList[i].hire_form;
    var education_bgc = teachersList[i].education_bgc;
    var native_place = teachersList[i].native_place;
    var politics_status = teachersList[i].politics_status;
    var mobile = teachersList[i].mobile;
    var qq_number = teachersList[i].qq_number;
    var wechat = teachersList[i].wechat;
    var email = teachersList[i].email;
    var address = teachersList[i].address;
    var postal_address = teachersList[i].postal_address;
    var degree_type = teachersList[i].degree_type;
    var graduate_school = teachersList[i].graduate_school;
    var graduate_time = teachersList[i].graduate_time;
    var major = teachersList[i].major;
    var sql = "insert into teacher_info(num,name,sex,duty,entry_time,hire_form,\n            education_bgc,native_place,politics_status,mobile,qq_number,wechat,email,\n            address,postal_address,degree_type,graduate_school,graduate_time,major) values\n            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sql, [num, name, sex, duty, entry_time, hire_form, education_bgc, native_place, politics_status, mobile, qq_number, wechat, email, address, postal_address, degree_type, graduate_school, graduate_time, major], function (err, result) {
      if (err) {
        console.log('导入excel教师时数据库出错', err);
        return;
      }
    });
  }

  res.json({
    status: 200,
    msg: '导入excel教师成功！'
  });
});
module.exports = router;