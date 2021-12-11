<template>
  <div>
    <!-- 公共导入组件 -->
    <div v-if="$route.query.type =='student'">
      <upload-excel :on-success="handleSuccessByStudent" />
    </div>
    <div v-else-if="$route.query.type =='teacher'">
      <upload-excel :on-success="handleSuccessByTeacher" />
    </div>

  </div>
</template>

<script>
import { importStudents, importTeachers } from "@/api/import";
import { Message } from "element-ui";
export default {
  data() {
    return {};
  },
  methods: {
    // 导入学生时情况
    async handleSuccessByStudent({ header, results }) {
      console.log(header, results); //    （1） 找出所有的中文key //     (2)  得到对应的英文key //     (3)  拼接一个新对象： 英文key:值
      //   传入的是数组  后端要修改
      // 把一个对象数组中的每个对象的属性名，从中文改成英文
      // 思路：对于原数组每个对象来说
      const mapInfo = {
        专业: "major",
        名字: "stu_name",
        学号: "id",
        学年: "grad",
        宿舍号: "dormitory",
        导师: "advisor",
        系别: "duty",
        行政班级: "class",
        身份证: "idCard",
        辅导员: "counsellor",
        邮箱: "email",
      };
      const arr = [];
      results.forEach((item) => {
        const userInfo = {};
        Object.keys(item).forEach((key) => {
          userInfo[mapInfo[key]] = item[key];
        });
        arr.push(userInfo);
      });
      await importStudents(arr);
      Message.success("导入excel学生信息成功！");
      this.$router.back();
    },
    // 导入教师时情况
    async handleSuccessByTeacher({ header, results }) {
      console.log(header, results); //    （1） 找出所有的中文key //     (2)  得到对应的英文key //     (3)  拼接一个新对象： 英文key:值
      //   传入的是数组  后端要修改
      // 把一个对象数组中的每个对象的属性名，从中文改成英文
      // 思路：对于原数组每个对象来说
      const mapInfo = {
        工号: "num",
        姓名: "name",
        性别: "sex",
        部门: "duty",
        入职时间: "entry_time",
        聘用形式: "hire_form",
        最高学历: "education_bgc",
        籍贯: "native_place",
        政治面貌: "politics_status",
        手机: "mobile",
        QQ: "qq_number",
        微信: "wechat",
        邮箱: "email",
        现居住地: "address",
        通讯地址: "postal_address",
        学历类型: "degree_type",
        毕业学校: "graduate_school",
        毕业时间: "graduate_time",
        专业: "major",
      };
      const arr = [];
      results.forEach((item) => {
        const userInfo = {};
        Object.keys(item).forEach((key) => {
          userInfo[mapInfo[key]] = item[key];
        });
        arr.push(userInfo);
      });
      await importTeachers(arr);
      Message.success("导入excel教师信息成功！");
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>