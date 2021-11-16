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
          <el-timeline :reverse="true">
            <el-timeline-item
              v-for="(item, index) in teachingTask"
              :key="index"
              :timestamp="item.time"
              placement="top"
              :color="index===teachingTask.length - 1 ? '#0bbd87' : ''"
            >
              <el-card class="clear-fix">
                <div class="left">
                  <h4>{{item.title}}</h4>
                  <p class="content">{{item.content}}</p>
                </div>
                <div class="right">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getTeachingTask, getTeachingTaskByCno } from "@/api/teachingTask";
export default {
  data() {
    return {
      teachCourse: [],
      teachingTask: [],
      currentCourse: 0,
    };
  },
  created() {
    this.getTeachingTask();
  },

  methods: {
    async getTeachingTask() {
      let res = await getTeachingTask();
      //   console.log(res);
      for (let i = 0; i < res.course.length; i++) {
        this.teachCourse.push({
          name: res.course[i].name,
          cno: res.course[i].cno,
        });
      }
      for (let i = 0; i < res.teaching_task.length; i++) {
        this.teachingTask.push({
          title: res.teaching_task[i].title,
          content: res.teaching_task[i].content,
          time: res.teaching_task[i].time,
        });
      }
    },
    async tabClick(value) {
      const index = this.teachCourse.findIndex((ele, index) => {
        return ele.name === value.label;
      });
      this.currentCourse = index;
      const cno = this.teachCourse[index].cno;
      let res = await getTeachingTaskByCno(cno);
      this.teachingTask = [];
      for (let i = 0; i < res.teaching_task.length; i++) {
        this.teachingTask.push({
          title: res.teaching_task[i].title,
          content: res.teaching_task[i].content,
          time: res.teaching_task[i].time,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.clear-fix {
  overflow: hidden;
  .left {
    float: left;
    .content {
      text-indent: 2em;
    }
  }
  .right {
    float: right;
  }
}
</style>