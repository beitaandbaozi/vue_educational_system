<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row
          type="flex"
          class="row-bg"
          justify="space-between"
        >
          <el-col :span="6">
            <div>学号：{{stuForm.number}}</div>
          </el-col>
          <el-col :span="6">
            <div>姓名：{{stuForm.name}}</div>
          </el-col>
          <el-col :span="6">
            <div>年级：{{stuForm.grad}}</div>
          </el-col>
        </el-row>
        <br>
        <el-row
          type="flex"
          class="row-bg"
          justify="space-between"
        >
          <el-col :span="6">
            <div>专业：{{stuForm.major}}</div>
          </el-col>
          <el-col :span="6">
            <div>身份证：{{stuForm.idCard}}</div>
          </el-col>
          <el-col :span="6">
            <div>电子邮箱：{{stuForm.email}}</div>
          </el-col>
        </el-row>
        <br>
        <el-row
          type="flex"
          class="row-bg"
          justify="space-between"
        >
          <el-col :span="6">
            <div>行政班：{{stuForm.class}}</div>
          </el-col>
          <el-col :span="6">
            <div>班主任：{{stuForm.advisor}}</div>
          </el-col>
          <el-col :span="6">
            <div>辅导员：{{stuForm.counsellor}}</div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getStuInfo } from "@/api/stuMesg";
export default {
  data() {
    return {
      stuForm: {
        number: "",
        name: "",
        grad: "",
        class: "",
        major: "",
        idCard: "",
        email: "",
        advisor: "",
        counsellor: "",
      },
    };
  },
  created() {
    // 获取用户个人信息
    this.getStuInfo();
  },
  methods: {
    // 获取用户个人信息
    async getStuInfo() {
      let res = await getStuInfo();
      // 给表单赋值
      this.stuForm = res;
    },
  },
};
</script>

<style>
</style>