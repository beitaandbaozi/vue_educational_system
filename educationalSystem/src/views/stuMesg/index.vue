<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 个人基本信息 -->
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
        <br>
        <!-- 头像管理 -->
        <el-row>
          <el-col :offset="18">
            <ImageUpload ref="staffPhoto"></ImageUpload>
          </el-col>
          <el-col :offset="22">
            <el-button
              type="success"
              round
              @click="saveInfo"
            >保存头像</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-tabs
        type="border-card"
        style="margin-top:20px"
      >
        <el-tab-pane label="必修课程">
          <!-- 必修课信息 -->
          <el-table
            :data="requiredCourseData.result"
            border
            style="width: 100%;"
          >
            <el-table-column
              align="center"
              label="课程代码"
              prop="cno"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="课程名称"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="学分"
              prop="credit"
              width="50"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="考核方式"
              prop="assess"
              width="100"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="修读学年学期"
              prop="academic"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="成绩"
              prop="grade"
              width="50"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="已得学分"
              prop="gradepo"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="选修课程">
          <el-table
            :data="optioanlCourseData.result"
            border
            style="width: 100%;"
          >
            <el-table-column
              align="center"
              label="课程代码"
              prop="cno"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="课程名称"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="学分"
              prop="credit"
              width="50"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="考核方式"
              prop="assess"
              width="100"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="修读学年学期"
              prop="academic"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="成绩"
              prop="grade"
              width="50"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="已得学分"
              prop="gradepo"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getStuInfo,
  getRequireCourseInfo,
  getOptionalCourseInfo,
  saveStuInfo
} from "@/api/stuMesg";
import { Message } from "element-ui";
export default {
  data() {
    return {
      // 个人基本信息
      stuForm: {
        
      },
      // 必修课程信息
      requiredCourseData: [],
      //选修课程信息
      optioanlCourseData: [],
    };
  },
  created() {
    // 获取学生个人信息
    this.getStuInfo();
    // 获取学生必修课信息
    this.getRequireCourseInfo();
    // 获取学生选修课信息
    this.getOptionalCourseInfo();
  },
  methods: {
    // 获取学生个人信息
    async getStuInfo() {
      let res = await getStuInfo();
      // 给表单赋值
      this.stuForm = res;
      //头像赋值
      if (this.stuForm.avator) {
        this.$refs.staffPhoto.fileList = [
          { url: this.stuForm.avator, upload: true },
        ];
      }
    },
    // 获取学生必修课信息
    async getRequireCourseInfo() {
      let res = await getRequireCourseInfo();
      this.requiredCourseData = res;
    },

    // 获取选修课信息
    async getOptionalCourseInfo() {
      let res = await getOptionalCourseInfo();
      this.optioanlCourseData = res;
    },
    // 保存头像
    async saveInfo() {
      // 读取上传的头像
      const fileList = this.$refs.staffPhoto.fileList;
      if (fileList.some((item) => !item.upload)) {
        // 如果此时去找 upload为false的图片 找到了说明 有图片还没有上传完成
        Message.warning("当前图片没有上传完成！");
        return;
      }
      await saveStuInfo({
        ...this.stuForm,
        avator: fileList && fileList.length ? fileList[0].url : "",
      });
      Message.success('保存头像信息成功!')
    },
  },
};
</script>

<style>
</style>