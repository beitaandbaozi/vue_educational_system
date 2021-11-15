<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row>
          <el-col :span="16">
            <el-row>
              <h2>{{teacherInfo.name}}</h2>
            </el-row>
            <el-row>
              <el-col :span="6"><i class="el-icon-user"></i> {{teacherInfo.number}}</el-col>
              <el-col :span="6"><i class="el-icon-message"></i> {{teacherInfo.email}}</el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="6"><i class="el-icon-setting"></i> {{teacherInfo.duty}}</el-col>
              <el-col :span="6"><i class="el-icon-loading"></i> {{teacherInfo.hire_form}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            头像组件
          </el-col>
        </el-row>
        <br>
        <!-- 基础信息 -->
        <el-divider content-position="left">
          <h3 style="color:#5698c3">基础信息</h3>
        </el-divider>
        <br>
        <el-card>
          <el-row class="inline-info">
            <el-col :span="6">
              <i class="el-icon-star-on"></i> {{teacherInfo.number}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-user-solid"></i> {{teacherInfo.name}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-tools"></i> {{teacherInfo.duty}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-watch"></i> {{teacherInfo.entry_time}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <i class="el-icon-s-promotion"></i> {{teacherInfo.hire_form}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-home"></i> {{teacherInfo.education_bgc}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-ticket"></i> {{teacherInfo.native_place}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-claim"></i> {{teacherInfo.politics_status}}
            </el-col>
          </el-row>
        </el-card>
        <br>
        <br>
        <!--通讯信息-->
        <el-divider content-position="left">
          <h3 style="color:#5698c3">通讯信息</h3>
        </el-divider>
        <br>
        <el-card>
          <el-row class="inline-info">
            <el-col :span="6">
              <i class="el-icon-phone"></i>{{teacherInfo.mobile}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-shop"></i>{{teacherInfo.qq_number}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-marketing"></i>{{teacherInfo.wechat}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-s-flag"></i>{{teacherInfo.email}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <i class="el-icon-s-home"></i>{{teacherInfo.address}}
            </el-col>
            <el-col :span="12">
              <i class="el-icon-office-building"></i>{{teacherInfo.postal_address}}
            </el-col>
          </el-row>
        </el-card>
        <br>
        <br>
        <!-- 教育信息 -->
        <!--通讯信息-->
        <el-divider content-position="left">
          <h3 style="color:#5698c3">教育信息</h3>
        </el-divider>
        <br>
         <el-card>
            <el-row>
              <el-col :span="6">
                <i class="el-icon-s-custom"></i> {{teacherInfo.degree_type}}
              </el-col>
              <el-col :span="6">
                <i class="el-icon-s-data"></i> {{teacherInfo.graduate_school}}
              </el-col>
              <el-col :span="6">
                <i class="el-icon-s-order"></i> {{teacherInfo.graduate_time}}
              </el-col>
              <el-col :span="6">
                <i class="el-icon-s-grid"></i> {{teacherInfo.major}}
              </el-col>
            </el-row>
          </el-card>
      </el-card>
    </div>
  </div>

</template>

<script>
import { getTeacherInfo } from "@/api/teacherMesg";
export default {
  data() {
    return {
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