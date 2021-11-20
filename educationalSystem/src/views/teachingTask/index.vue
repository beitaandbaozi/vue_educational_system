<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs
        type="card"
        @tab-click="tabCourse"
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
                <div class="right" v-if="roles == 'teacher'">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="small"
                    @click="editTeachTask(index)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    @click="delTeachTask(index)"
                  >删除</el-button>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
      <!-- 新增教学任务的按钮 -->
      <el-row
        type="flex"
        justify="end"
        v-if="roles == 'teacher'"
      >
        <el-button
          type="success"
          plain
          round
          @click="addTeachTask"
        >新增教学任务</el-button>
      </el-row>
    </div>
    <!-- 编辑教学任务的对话框 -->
    <el-dialog
      title="编辑教学任务"
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
    <!-- 添加教学任务的对话框 -->
    <el-dialog
      title="新增教学任务"
      :visible="addTeachTaskDialog"
      width="50%"
      @close="btnAddCancel"
    >
      <el-form
        :model="addForm"
        ref="addRef"
        :rules="editRules"
      >
        <el-form-item label="课程号">
          <el-input
            v-model="addForm.cno"
            autocomplete="off"
            placeholder="请输入课程号"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input
            v-model="addForm.name"
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
            v-model="addForm.title"
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
            v-model="addForm.content"
            autocomplete="off"
            placeholder="请输入内容"
            maxlength="500"
            show-word-limit
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="addForm.time"
            format="yyyy/M/d H:mm"
            value-format="yyyy/M/d H:mm"
            type="datetime"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="btnAddCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submitTeachTask(currentIndex)"
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
  delTeachingTask,
  addTeachingTask,
  getStuTeachingTask,
  getStuTeachingTaskByCno,
} from "@/api/teachingTask";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
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
      // 添加教学任务对话框
      addTeachTaskDialog: false,
      // 添加教学任务对象
      addForm: {},
    };
  },
  created() {
    this.getAllTeachingTask();
  },

  methods: {
    getAllTeachingTask() {
      if (this.roles == "teacher") {
        this.getTeachingTask();
      } else {
        this.getStuTeachingTask();
      }
    },
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
    async getStuTeachingTask() {
      let res = await getStuTeachingTask();
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
    // 切换tab页
    tabCourse(value) {
      if (this.roles == "teacher") {
        this.tabClick(value);
      } else {
        this.tabStuClick(value);
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
    async tabStuClick(value) {
      const index = this.teachCourse.findIndex((ele, index) => {
        return ele.name === value.label;
      });
      this.currentCourse = index;
      const cno = this.teachCourse[index].cno;
      let res = await getStuTeachingTaskByCno(cno);
      this.teachingTask = [];
      for (let i = 0; i < res.teaching_task.length; i++) {
        this.teachingTask.push({
          title: res.teaching_task[i].title,
          content: res.teaching_task[i].content,
          time: res.teaching_task[i].time,
        });
      }
    },

    // 编辑教学任务
    editTeachTask(index) {
      this.editForm = Object.assign({}, this.teachingTask[index]);
      //   console.log(this.editForm);
      this.currentIndex = index;
      this.editForm.cno = this.teachCourse[this.currentCourse].cno;
      this.editForm.name = this.teachCourse[this.currentCourse].name;
      // 开启对话框
      this.editTeachTaskDialog = true;
    },
    // 提交编辑教学任务
    btnEditOk(index) {
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
          return Message.info("已经取消修改！");
        }
        // 连接接口
        await editTeachingTask(this.editForm.cno, this.editForm);
        // 更新数据
        this.teachingTask.splice(index, 1, this.editForm);
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
    // 删除教学任务
    async delTeachTask(index) {
      const confirmResult = await this.$confirm(
        "此操作将删除教学任务，是否继续?",
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
      const cno = this.teachCourse[this.currentCourse].cno;
      const time = this.teachingTask[index].time;
      const data = JSON.stringify({ time });
      // 连接接口
      await delTeachingTask(cno, data);
      // 更新数据
      this.teachingTask.splice(index, 1);
      this.editTeachTaskDialog = false;
      // 提示消息
      Message.success("删除教学任务完成！");
    },
    // 新增教学任务
    addTeachTask() {
      this.addForm.cno = this.teachCourse[this.currentCourse].cno;
      this.addForm.name = this.teachCourse[this.currentCourse].name;
      this.addTeachTaskDialog = true;
    },
    // 关闭新增教学任务
    btnAddCancel() {
      // 清楚校验规则
      // 清除对话框
      // 关闭对话框
      this.addTeachTaskDialog = false;
    },
    // 提交新增的教学任务
    submitTeachTask(index) {
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return;
        const confirmResult = await this.$confirm(
          "此操作将提交教学任务，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((error) => error);
        if (confirmResult != "confirm") {
          return Message.info("已经取消提交！");
        }
        const cno = this.addForm.cno;
        const time = this.addForm.time;
        const title = this.addForm.title;
        const content = this.addForm.content;
        const data = JSON.stringify({ time, title, content });
        // 连接接口
        await addTeachingTask(cno, data);
        // 更新数据
        this.teachingTask.splice(index, 1, this.addForm);
        // 通知消息
        Message.success("新增教学任务成功！");
        // 关闭接口
        this.addTeachTaskDialog = false;
      });
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