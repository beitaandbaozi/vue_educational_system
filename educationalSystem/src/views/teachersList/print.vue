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
        <h2 class="centInfo">教师信息表</h2>
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
            <th style="width: 10%">工号</th>
            <td
              colspan="6"
              style="width: 70%"
            >{{ teacherInfo.num }}</td>
            <td
              rowspan="7"
              style="width: 20%"
            >
              <img
                v-if="teacherInfo.avator"
                style="width: 200px; height: 200px"
                :src="teacherInfo.avator"
              />
              <img
                v-else
                style="width: 200px; height: 218px"
                src="@/assets/common/header.png"
              />
            </td>
          </tr>
          <tr>
            <th>姓名</th>
            <td colspan="6">{{ teacherInfo.name }}</td>
          </tr>
          <tr>
            <th>性别</th>
            <td colspan="6">{{ teacherInfo.sex }}</td>
          </tr>
          <tr>
            <th>部门</th>
            <td colspan="6">{{ teacherInfo.duty }}</td>
          </tr>
          <tr>
            <th>学历</th>
            <td colspan="6">{{ teacherInfo.education_bgc }}</td>
          </tr>
          <tr>
            <th>政治面貌</th>
            <td colspan="6">{{ teacherInfo.politics_status }}</td>
          </tr>
          <tr>
            <th>籍贯</th>
            <td colspan="6">{{ teacherInfo.native_place }}</td>
          </tr>
          <!-- 通讯信息 -->
          <tr class="title">
            <td
              colspan="8"
              class="centInfo"
            >通讯信息</td>
          </tr>
          <tr>
            <th>联系电话</th>
            <td>{{ teacherInfo.mobile }}</td>
            <th>QQ</th>
            <td colspan="1">{{ teacherInfo.qq_number }}</td>
            <th>微信</th>
            <td colspan="4">{{ teacherInfo.wechat }}</td>
          </tr>
          <tr>
            <th>邮箱</th>
            <td colspan="1">{{ teacherInfo.email }}</td>
            <th>现居住地</th>
            <td colspan="">{{ teacherInfo.address }}</td>
            <th>通信地址</th>
            <td colspan="4">{{ teacherInfo.postal_address }}</td>
          </tr>
          <!-- 教育信息  -->
          <tr class="title">
            <td
              colspan="8"
              class="centInfo"
            >教育信息</td>
          </tr>
          <tr>
            <th>学历类型</th>
            <td colspan="4">{{ teacherInfo.degree_type }}</td>
            <th>毕业学校</th>
            <td colspan="4">{{ teacherInfo.graduate_school }}</td>
          </tr>
          <tr>
            <th>毕业时间</th>
            <td colspan="4">{{ teacherInfo.graduate_time }}</td>
            <th>专业</th>
            <td colspan="4">{{ teacherInfo.major }}</td>
          </tr>
        </table>
        <div style="display:flex;justify-content:end;margin-top:20px">签字：___________日期：___________</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeacherByNum } from "@/api/teachersList";
export default {
  data() {
    return {
      num: this.$route.params.id,
      //教师信息
      teacherInfo: {},
    };
  },
  created() {
    this.getTeacherByNum();
  },
  methods: {
    async getTeacherByNum() {
      let res = await getTeacherByNum(this.num);
      this.teacherInfo = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>