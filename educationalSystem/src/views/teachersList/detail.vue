<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before"> {{teacherInfo.name}} 的个人资料</span>
        <template slot="after">
          <el-button
            size="small"
            type="success"
            plain
            @click="saveTeacherInfo"
          >保存更新</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-printer"
            plain
          >打印教师信息</el-button>
        </template>
      </page-tools>
      <!-- 资料 -->
      <el-card>
        <el-form
          :model="teacherInfo"
          label-width="100px"
        >
          <!-- 头像信息 -->
          <el-row
            type="flex"
            justify="end"
          >
            <img
              v-if="teacherInfo.avator"
              :src="teacherInfo.avator"
              alt="header"
              class="header"
            >
            <img
              v-else
              src="@/assets/common/header.png"
              alt="header"
              class="header"
            >
          </el-row>
          <!-- 基础信息 -->
          <el-divider
            content-position="left"
            class="divider"
          >基础信息</el-divider>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="工号">
              <el-input
                v-model="teacherInfo.num"
                disabled
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="teacherInfo.name"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-select
                size="small"
                v-model="teacherInfo.duty"
                placeholder="请选择部门"
              >
                <el-option
                  v-for="item in dutyOptions"
                  :key="item.duty"
                  :label="item.duty"
                  :value="item.duty"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职时间">
              <el-input
                v-model="teacherInfo.entry_time"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="聘用形式">
              <el-input
                v-model="teacherInfo.hire_form"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="最高学历">
              <el-input
                v-model="teacherInfo.education_bgc"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input
                v-model="teacherInfo.native_place"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="政治面貌">
              <el-input
                v-model="teacherInfo.politics_status"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 通讯信息 -->
          <el-divider
            content-position="left"
            class="divider"
          >通讯信息</el-divider>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="联系电话">
              <el-input
                v-model="teacherInfo.mobile"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input
                v-model="teacherInfo.qq_number"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input
                v-model="teacherInfo.wechat"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="teacherInfo.email"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="现居住地">
              <el-input
                v-model="teacherInfo.address"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="通信地址">
              <el-input
                v-model="teacherInfo.postal_address"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 教育信息 -->
          <el-divider
            content-position="left"
            class="divider"
          >教育信息</el-divider>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-form-item label="学历类型">
              <el-input
                v-model="teacherInfo.degree_type"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="毕业学校">
              <el-input
                v-model="teacherInfo.graduate_school"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="毕业时间">
              <el-input
                v-model="teacherInfo.graduate_time"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="专业">
              <el-input
                v-model="teacherInfo.major"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getTeacherInfoByNum } from "@/api/teachersList";
import { getAllDuty } from "@/api/studentsList";
export default {
  data() {
    return {
      //路由信息中取下来的id值
      num: this.$route.params.id,
      // 教师信息
      teacherInfo: {},
      dutyOptions: {},
    };
  },
  created() {
    this.getTeacherInfoByNum();
    this.getAllDuty();
  },
  methods: {
    //获取对应工号的教师信息
    async getTeacherInfoByNum() {
      let res = await getTeacherInfoByNum(this.num);
      this.teacherInfo = res.result;
    },
    // 获取全部系别信息
    async getAllDuty() {
      let res = await getAllDuty();
      this.dutyOptions = res.result;
    },
    // 保存更改信息
    saveTeacherInfo(){

    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.divider {
  margin: 30px 0px;
  .el-divider__text {
    font-size: 18px;
    color: lightcoral;
  }
}
</style>