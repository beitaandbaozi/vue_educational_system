<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 个人信息 -->
      <el-card>
        <el-row
          type="flex"
          justify="space-around"
        >
          <el-col :span="6">
            工号：{{teacherForm.number}}
          </el-col>
          <el-col :span="6">
            姓名：{{teacherForm.name}}
          </el-col>
          <el-col :span="6">
            系别：{{teacherForm.duty}}
          </el-col>
        </el-row>
      </el-card>
      <!-- 考试时间信息 -->
      <el-card style="margin-top:20px">
        <el-collapse style="padding:10px">
          <el-collapse-item
            v-for="(item) in testList"
            :key="item.cno"
            :title="item.name"
          >
            <el-row
              type="flex"
              justify="space-between"
            >
              <el-col>
                课程代码：{{item.cno}}
              </el-col>
              <el-col>
                课程名称：{{item.name}}
              </el-col>
              <el-col>
                课程所属系别：{{item.duty}}
              </el-col>
              <el-col>
                课程学分：{{item.credit}}
              </el-col>
              <el-col style="color:red;">
                考试时间：{{item.test_time}}
              </el-col>
              <el-col style="color:red;">
                考试地点：{{item.test_room}}
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getTeacherInfo } from "@/api/teacherMesg";
import { getTestTime } from "@/api/teacherTestTime";
export default {
  data() {
    return {
      teacherForm: {},
      // 考试时间列表
      testList: [],
    };
  },
  created() {
    this.getTeacherInfo();
    this.getTestTime();
  },
  methods: {
    //  获取个人信息
    async getTeacherInfo() {
      let res = await getTeacherInfo();
      // 给表单赋值
      this.teacherForm = res;
    },
    async getTestTime() {
      let res = await getTestTime();
      this.testList = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-collapse {
  border: 0px;
}
</style>