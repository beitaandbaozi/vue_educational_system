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
            :span-method="objectSpanMethod"
          >
            <el-table-column
              align="center"
              prop="time"
              label="开课学期"
            >
            </el-table-column>
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
            <el-table-column
              align="center"
              label="上课类型"
              prop="type"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="选修课程"> <el-table
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
          </el-table></el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import { getStuInfo, getRequireCourseInfo,getOptionalCourseInfo } from "@/api/stuMesg";
export default {
  data() {
    return {
      // 个人基本信息
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
    },
    // 获取学生必修课信息
    async getRequireCourseInfo() {
      let res = await getRequireCourseInfo();
      this.requiredCourseData = res;
    },
    // 计算行列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    // 获取选修课信息
    async getOptionalCourseInfo(){
        let res = await getOptionalCourseInfo();
        this.optioanlCourseData = res
    }
  },
};
</script>

<style>
</style>