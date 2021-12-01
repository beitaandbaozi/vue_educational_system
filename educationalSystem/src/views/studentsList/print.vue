<template>
  <div
    class="dashboard-container"
    id="myPrint"
  >
    <div class="app-container">
      <div>
        <h2 class="centInfo">学生信息表</h2>
        <table
          cellspacing="0"
          width="100%"
          class="tableList"
        >
          <tr class="title">
            <td
              colspan="8"
              class="centInfo"
            >基础信息</td>
          </tr>
          <tr>
            <th style="width: 10%">学号</th>
            <td
              colspan="6"
              style="width: 80%"
            >{{ studentInfo.id }}</td>
            <td
              rowspan="5"
              style="width: 10%"
            >
              <img
                style="width: 155px; height: 218px"
                :src="studentInfo.avator"
              />
            </td>
          </tr>
          <tr>
            <th>姓名</th>
            <td colspan="6">{{ studentInfo.stu_name }}</td>
          </tr>
          <tr>
            <th>系别</th>
            <td colspan="6">{{ studentInfo.duty }}</td>
          </tr>
          <tr>
            <th>年级</th>
            <td colspan="6">{{ studentInfo.grad }}</td>
          </tr>
          <!-- 班级信息 -->
          <tr class="title">
            <td
              colspan="8"
              class="centInfo"
            >班级信息</td>
          </tr>
          <tr>
            <th>专业</th>
            <td>{{ studentInfo.major }}</td>
            <th>行政班级</th>
            <td colspan="5">{{ studentInfo.class }}</td>
          </tr>
          <tr>
            <th>导生</th>
            <td>{{ studentInfo.advisor }}</td>
            <th>辅导员</th>
            <td colspan="5">{{ studentInfo.counsellor }}</td>
          </tr>
          <!-- 通讯信息  -->
          <tr class="title">
            <td
              colspan="8"
              class="centInfo"
            >通讯信息</td>
          </tr>
          <tr>
            <th>身份证</th>
            <td>{{ studentInfo.idCard }}</td>
            <th>邮件</th>
            <td colspan="5">{{ studentInfo.email }}</td>
          </tr>
          <tr>
            <th>宿舍号</th>
            <td>{{ studentInfo.dormitory }}</td>
          </tr>
        </table>
        <div class="foot">签字：___________日期:___________</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentInfo: {},
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>