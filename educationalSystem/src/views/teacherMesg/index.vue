<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activename">
        <el-tab-pane
          label="基础信息"
          name="first"
        >
          <el-card>
            <el-row class="inline-info">
              <el-col :span="6">
                工号：{{teacherInfo.number}}
              </el-col>
              <el-col :span="6">
                姓名：{{teacherInfo.name}}
              </el-col>
              <el-col :span="6">
                部门：{{teacherInfo.duty}}
              </el-col>
              <el-col :span="6">
                入职时间：{{teacherInfo.entry_time}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                聘用形式：{{teacherInfo.hire_form}}
              </el-col>
              <el-col :span="6">
                最高学历：{{teacherInfo.education_bgc}}
              </el-col>
              <el-col :span="6">
                籍贯：{{teacherInfo.native_place}}
              </el-col>
              <el-col :span="6">
                政治面貌：{{teacherInfo.politics_status}}
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane
          label="通讯信息"
          name="second"
        >
          <el-card>
            <el-row class="inline-info">
              <el-col :span="6">
                联系手机：{{teacherInfo.mobile}}
              </el-col>
              <el-col :span="6">
                QQ：{{teacherInfo.qq_number}}
              </el-col>
              <el-col :span="6">
                微信：{{teacherInfo.wechat}}
              </el-col>
              <el-col :span="6">
                个人邮箱：{{teacherInfo.email}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                现居住地：{{teacherInfo.address}}
              </el-col>
              <el-col :span="12">
                通讯地址：{{teacherInfo.postal_address}}
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane
          label="教育信息"
          name="third"
        >
          <el-card>
            <el-row>
              <el-col :span="6">
                学历类型：{{teacherInfo.degree_type}}
              </el-col>
              <el-col :span="6">
                毕业学校：{{teacherInfo.graduate_school}}
              </el-col>
              <el-col :span="6">
                毕业时间：{{teacherInfo.graduate_time}}
              </el-col>
              <el-col :span="6">
                专业：{{teacherInfo.major}}
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import { getTeacherInfo } from "@/api/teacherMesg";
export default {
  data() {
    return {
      // Tab页激活
      activename: "first",
      // 老师个人信息
      teacherInfo: {},
    };
  },
  created() {
    this.getTeacherInfo();
  },
  methods: {
    // 获取教师个人信息
    async getTeacherInfo() {
      let res = await getTeacherInfo();
      this.teacherInfo = res;
    },
  },
};
</script>

<style lang="scss">
.inline-info {
  margin-bottom: 20px;
}
</style>