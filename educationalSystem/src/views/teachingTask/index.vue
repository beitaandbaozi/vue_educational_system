<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs
        type="card"
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
                    @click="editTeachTask(index)"
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
    <!-- 编辑教学任务的对话框 -->
    <el-dialog
      title="教学任务"
      :visible="editTeachTaskDialog"
      width="50%"
      @close="btnEditCancel"
    >
      <el-form
        :model="editForm"
        ref="editRef"
        :rules="editRules"
      >
        <el-form-item label="课程号">
          <el-input
            v-model="editForm.cno"
            autocomplete="off"
            placeholder="请输入课程号"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input
            v-model="editForm.name"
            autocomplete="off"
            placeholder="请输入课程名"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="editForm.title"
            autocomplete="off"
            placeholder="请输入标题"
            maxlength="50"
            show-word-limit
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <el-input
            type="textarea"
            v-model="editForm.content"
            autocomplete="off"
            placeholder="请输入内容"
            maxlength="500"
            show-word-limit
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="editForm.time"
            format="yyyy/M/d H:mm"
            value-format="yyyy/M/d H:mm"
            type="datetime"
            placeholder="选择日期"
            :disabled="true"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="btnEditCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="btnEditOk(currentIndex)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTeachingTask,
  getTeachingTaskByCno,
  editTeachingTask,
} from "@/api/teachingTask";
import { Message } from "element-ui";
export default {
  data() {
    return {
      teachCourse: [],
      teachingTask: [],
      currentCourse: 0,
      currentIndex: 0,
      // 编辑对话框
      editTeachTaskDialog: false,
      // 编辑教学任务对象
      editForm: {},
      // 编辑教学任务检验规则
      editRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
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
          cno: res.teaching_task[i].cno,
          tno: res.teaching_task[i].tno,
          name: res.teaching_task[i].name,
        });
      }
    },
    // 切换tab页
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
          cno: res.teaching_task[i].cno,
          tno: res.teaching_task[i].tno,
          name: res.teaching_task[i].name,
        });
      }
    },
    // 编辑教学任务
    editTeachTask(index) {
      this.editForm = Object.assign({}, this.teachingTask[index]);
      //   console.log(this.editForm);
      this.currentIndex = index;
      // 开启对话框
      this.editTeachTaskDialog = true;
    },
    // 提交编辑教学任务
    btnEditOk(index) {
      // 表单验证
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return;
        const confirmResult = await this.$confirm(
          "此操作将修改教学任务，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((error) => error);
        if (confirmResult != "confirm") {
          return Message.info("已经取消删除！");
        }
        // 连接接口
        await editTeachingTask(this.editForm.cno, this.editForm);
        this.teachingTask.splice(index,1,this.editForm);
        // 提示消息
        Message.success("修改教学任务完成！");
        // 关闭对话框
        this.editTeachTaskDialog = false;
      });
    },
    // 关闭编辑对话框
    btnEditCancel() {
      this.editTeachTaskDialog = false;
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