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
            学号：{{stuForm.number}}
          </el-col>
          <el-col :span="6">
            姓名：{{stuForm.name}}
          </el-col>
          <el-col :span="6">
            专业：{{stuForm.major}}
          </el-col>
        </el-row>
      </el-card>
      <!-- 考试时间信息 -->
      <el-card style="margin-top:20px">
        <el-collapse style="padding:20px">
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
              <el-col style="color:red;font-weight:bold;">
                考试时间：{{item.test_time}}
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getStuInfo } from "@/api/stuMesg";
import { getTestTime } from "@/api/testTime";
export default {
  data() {
    return {
      stuForm: {
        number: "",
        name: "",
        major: "",
      },
      // 考试时间列表
      testList: [],
    };
  },
  created() {
    this.getStuInfo();
    this.getTestTime();
  },
  methods: {
    //  获取个人信息
    async getStuInfo() {
      let res = await getStuInfo();
      // 给表单赋值
      this.stuForm = res;
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