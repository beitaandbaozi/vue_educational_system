(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f7db476"],{"2ccf":function(t,e,a){"use strict";a.d(e,"d",(function(){return r})),a.d(e,"f",(function(){return s})),a.d(e,"c",(function(){return c})),a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return o})),a.d(e,"g",(function(){return _})),a.d(e,"e",(function(){return d}));var n=a("b775");function r(t){return Object(n["a"])({url:"/admin/getAllTeachers",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/admin/getTeacherByNum/".concat(t),method:"get"})}function c(t,e){return Object(n["a"])({url:"/admin/editTeacherSubmit/".concat(t),method:"post",data:e})}function i(t){return Object(n["a"])({url:"/admin/delTeacherByNum/".concat(t),method:"get"})}function o(t){return Object(n["a"])({url:"/admin/addTeacher",method:"post",data:t})}function _(t){return Object(n["a"])({url:"/admin/saveTeacherInfo",method:"post",data:t})}function d(){return Object(n["a"])({url:"/admin/getAllTeachersByExcel",method:"get"})}},"48a5":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard-container",attrs:{id:"myPrint"}},[n("div",{staticClass:"app-container"},[n("el-row",{attrs:{type:"flex",justify:"end"}},[n("el-link",{directives:[{name:"print",rawName:"v-print",value:t.printObj,expression:"printObj"}],attrs:{icon:"el-icon-printer"}})],1),n("div",[n("h2",{staticClass:"centInfo"},[t._v("教师信息表")]),n("table",{staticClass:"tableList",attrs:{cellspacing:"0",width:"100%"}},[t._m(0),n("tr",[n("th",{staticStyle:{width:"10%"}},[t._v("工号")]),n("td",{staticStyle:{width:"70%"},attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.num))]),n("td",{staticStyle:{width:"20%"},attrs:{rowspan:"7"}},[t.teacherInfo.avator?n("img",{staticStyle:{width:"200px",height:"200px"},attrs:{src:t.teacherInfo.avator}}):n("img",{staticStyle:{width:"200px",height:"218px"},attrs:{src:a("e222")}})])]),n("tr",[n("th",[t._v("姓名")]),n("td",{attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.name))])]),n("tr",[n("th",[t._v("性别")]),n("td",{attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.sex))])]),n("tr",[n("th",[t._v("部门")]),n("td",{attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.duty))])]),n("tr",[n("th",[t._v("学历")]),n("td",{attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.education_bgc))])]),n("tr",[n("th",[t._v("政治面貌")]),n("td",{attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.politics_status))])]),n("tr",[n("th",[t._v("籍贯")]),n("td",{attrs:{colspan:"6"}},[t._v(t._s(t.teacherInfo.native_place))])]),t._m(1),n("tr",[n("th",[t._v("联系电话")]),n("td",[t._v(t._s(t.teacherInfo.mobile))]),n("th",[t._v("QQ")]),n("td",{attrs:{colspan:"1"}},[t._v(t._s(t.teacherInfo.qq_number))]),n("th",[t._v("微信")]),n("td",{attrs:{colspan:"4"}},[t._v(t._s(t.teacherInfo.wechat))])]),n("tr",[n("th",[t._v("邮箱")]),n("td",{attrs:{colspan:"1"}},[t._v(t._s(t.teacherInfo.email))]),n("th",[t._v("现居住地")]),n("td",{attrs:{colspan:""}},[t._v(t._s(t.teacherInfo.address))]),n("th",[t._v("通信地址")]),n("td",{attrs:{colspan:"4"}},[t._v(t._s(t.teacherInfo.postal_address))])]),t._m(2),n("tr",[n("th",[t._v("学历类型")]),n("td",{attrs:{colspan:"4"}},[t._v(t._s(t.teacherInfo.degree_type))]),n("th",[t._v("毕业学校")]),n("td",{attrs:{colspan:"4"}},[t._v(t._s(t.teacherInfo.graduate_school))])]),n("tr",[n("th",[t._v("毕业时间")]),n("td",{attrs:{colspan:"4"}},[t._v(t._s(t.teacherInfo.graduate_time))]),n("th",[t._v("专业")]),n("td",{attrs:{colspan:"4"}},[t._v(t._s(t.teacherInfo.major))])])]),n("div",{staticStyle:{display:"flex","justify-content":"end","margin-top":"20px"}},[t._v("签字：___________日期：___________")])])],1)])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticClass:"title"},[a("td",{staticClass:"centInfo",attrs:{colspan:"8"}},[t._v("基础信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticClass:"title"},[a("td",{staticClass:"centInfo",attrs:{colspan:"8"}},[t._v("通讯信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticClass:"title"},[a("td",{staticClass:"centInfo",attrs:{colspan:"8"}},[t._v("教育信息")])])}],s=a("1da1"),c=(a("96cf"),a("2ccf")),i={data:function(){return{num:this.$route.params.id,teacherInfo:{},printObj:{id:"myPrint"}}},created:function(){this.getTeacherByNum()},methods:{getTeacherByNum:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["f"])(t.num);case 2:a=e.sent,t.teacherInfo=a.result;case 4:case"end":return e.stop()}}),e)})))()}}},o=i,_=a("2877"),d=Object(_["a"])(o,n,r,!1,null,"f957521e",null);e["default"]=d.exports}}]);