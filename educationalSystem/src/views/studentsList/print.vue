<template>
  <div
    class="dashboard-container"
    id="myPrint"
  >
    <div class="app-container">
      <el-row
        type="flex"
        justify="end"
      >
        <el-link
          icon="el-icon-printer"
          v-print="printObj"
        ></el-link>
      </el-row>
      <div>
        <h2 class="centInfo">学生信息表</h2>
        <table
          cellspacing="0"
          width="100%"
          class="tableList"
        >
          <tr class="title">
            <td
              colspan="5"
              class="centInfo"
            >基础信息</td>
          </tr>
          <tr>
            <th style="width: 10%">学号</th>
            <td
              colspan="2"
              style="width: 70%"
            >{{ studentInfo.id }}</td>
            <td
              rowspan="3"
              style="width: 20%"
            >
              <img
                v-if="studentInfo.avator"
                style="width: 150px; height: 170px"
                :src="studentInfo.avator"
              />
              <img
                v-else
                style="width: 155px; height: 218px"
                src="@/assets/common/header.png"
              />
            </td>
          </tr>
          <tr>
            <th>姓名</th>
            <td colspan="2">{{ studentInfo.stu_name }}</td>
          </tr>
          <tr>
            <th>系别</th>
            <td colspan="2">{{ studentInfo.duty }}</td>
          </tr>
          <!-- 班级信息 -->
          <tr class="title">
            <td
              colspan="5"
              class="centInfo"
            >班级信息</td>
          </tr>
          <tr>
            <th>年级</th>
            <td>{{ studentInfo.grad }}</td>
            <th>行政班级</th>
            <td colspan="1">{{ studentInfo.class }}</td>
          </tr>
          <tr>
            <th>专业</th>
            <td>{{ studentInfo.major }}</td>
            <th>导生</th>
            <td colspan="1">{{ studentInfo.advisor }}</td>
          </tr>
          <!-- 通讯信息  -->
          <tr class="title">
            <td
              colspan="5"
              class="centInfo"
            >通讯信息</td>
          </tr>
          <tr>
            <th style="width: 20%">身份证</th>
            <td>{{ studentInfo.idCard }}</td>
            <th>邮件</th>
            <td colspan="1">{{ studentInfo.email }}</td>
          </tr>
          <tr>
            <th style="width: 20%">宿舍号</th>
            <td>{{ studentInfo.dormitory }}</td>
            <th>辅导员</th>
            <td colspan="1">{{ studentInfo.counsellor }}</td>
          </tr>
        </table>
        <div style="display:flex;justify-content:end;margin-top:20px">签字：___________日期：___________</div>
      </div>
    </div>
  </div>
</template>

<script>
import { editStudentById } from "@/api/studentsList";
export default {
  data() {
    return {
      studentInfo: {},
      num: this.$route.params.id,
      printObj: { id: "myPrint" },
    };
  },
  created() {
    this.getStuInfoById();
  },
  methods: {
    async getStuInfoById() {
      let res = await editStudentById(this.num);
      this.studentInfo = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>