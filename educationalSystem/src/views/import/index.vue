<template>
  <div>
    <!-- 公共导入组件 -->
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { importStudents } from "@/api/import";
import { Message } from "element-ui";
export default {
  data() {
    return {};
  },
  methods: {
    async handleSuccess({ header, results }) {
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
      Message.success("导入excel成功！");
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>