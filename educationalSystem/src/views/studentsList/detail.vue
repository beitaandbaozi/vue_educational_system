<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before"> {{studentInfo.stu_name}} 的个人资料</span>
        <template slot="after">
          <el-button
            size="small"
            type="success"
            plain
          >编辑</el-button>
          <el-button
            size="small"
            type="primary"
            plain
          >打印</el-button>
        </template>
      </page-tools>
      <!-- 资料 -->
      <el-card>
        <el-form
          :model="studentInfo"
          label-width="80px"
        >
          <!-- 头像信息 -->
          <el-row
            type="flex"
            justify="end"
          >
            <img
              v-if="studentInfo.avator"
              :src="studentInfo.avator"
              alt="header"
              class="header"
            >
            <img
              v-else
              src="@/assets/common/header.png"
              alt="header"
              class="header"
            >
          </el-row>
          <!-- 基础信息 -->
          <el-divider
            content-position="left"
            class="divider"
          >基础信息</el-divider>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="学号">
              <el-input
                v-model="studentInfo.id"
                disabled
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="studentInfo.stu_name"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="系别">
              <el-input
                v-model="studentInfo.duty"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="年级">
              <el-input
                v-model="studentInfo.grad"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 班级信息 -->
          <el-divider
            content-position="left"
            class="divider"
          >班级信息</el-divider>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="专业">
              <el-input
                v-model="studentInfo.major"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="行政班级">
              <el-input
                v-model="studentInfo.class"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="导生">
              <el-input
                v-model="studentInfo.advisor"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="辅导员">
              <el-input
                v-model="studentInfo.counsellor"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 通讯信息 -->
          <el-divider
            content-position="left"
            class="divider"
          >通讯信息</el-divider>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="身份证">
              <el-input
                v-model="studentInfo.idCard"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮件">
              <el-input
                v-model="studentInfo.email"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="宿舍号">
              <el-input
                v-model="studentInfo.dormitory"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { editStudentById } from "@/api/studentsList";
export default {
  data() {
    return {
      //路由信息中取下来的id值
      num: this.$route.params.id,
      studentInfo: {},
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
.header {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}
.divider {
  margin: 30px 0px;
  .el-divider__text {
    font-size: 18px;
    color: lightcoral;
  }
}
</style>