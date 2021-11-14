<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs
        type="border-card"
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="(item, index) in teachCourse"
          :key="index"
          :label="item.name"
        >
          <el-table
            :data="scoreCourse"
            :stripe="true"
            style="width: 100%"
          >
            <el-table-column
              prop="sno"
              label="学号"
            ></el-table-column>
            <el-table-column
              prop="stu_name"
              label="姓名"
            ></el-table-column>
            <el-table-column
              prop="class"
              label="班级"
            ></el-table-column>
            <el-table-column
              prop="grade"
              label="成绩"
            ></el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getScore, getScoreByCno } from "@/api/scoreManagement";
export default {
  data() {
    return {
      teachCourse: [],
      scoreCourse: [],
      currentCourse: 0,
    };
  },
  created() {
    this.getScore();
    this.tabClick();
  },
  methods: {
    async getScore() {
      let res = await getScore();
      console.log(res);
      for (let i = 0; i < res.course.length; i++) {
        this.teachCourse.push({
          name: res.course[i].name,
          cno: res.course[i].cno,
        });
      }
      for (let i = 0; i < res.grade.length; i++) {
        this.scoreCourse.push({
          sno: res.grade[i].sno,
          stu_name: res.grade[i].stu_name,
          class: res.grade[i].class,
          grade: res.grade[i].grade,
        });
      }
    },
    async tabClick(value) {
      const index = this.teachCourse.findIndex((ele, index) => {
        return ele.name === value.label;
      });
      this.currentCourse = index;
      const cno = this.teachCourse[index].cno;
      let res = await getScoreByCno(cno);
      this.scoreCourse = [];
      for (let i = 0; i < res.grade.length; i++) {
        this.scoreCourse.push({
          sno: res.grade[i].sno,
          stu_name: res.grade[i].stu_name,
          class: res.grade[i].class,
          grade: res.grade[i].grade
        });
      }
    },
  },
};
</script>

<style>
</style>
