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
            <ImageUpload ref="staffPhoto"></ImageUpload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="20">
            <el-button
              type="success"
              round
              @click="saveInfo"
            >保存头像</el-button>
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
              工号： {{teacherInfo.number}}
            </el-col>
            <el-col :span="6">
              姓名： {{teacherInfo.name}}
            </el-col>
            <el-col :span="6">
              部门： {{teacherInfo.duty}}
            </el-col>
            <el-col :span="6">
              入职时间： {{teacherInfo.entry_time}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              聘用形式： {{teacherInfo.hire_form}}
            </el-col>
            <el-col :span="6">
              最高学历： {{teacherInfo.education_bgc}}
            </el-col>
            <el-col :span="6">
              籍贯： {{teacherInfo.native_place}}
            </el-col>
            <el-col :span="6">
              政治面貌： {{teacherInfo.politics_status}}
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
              联系电话： {{teacherInfo.mobile}}
            </el-col>
            <el-col :span="6">
              QQ： {{teacherInfo.qq_number}}
            </el-col>
            <el-col :span="6">
              微信： {{teacherInfo.wechat}}
            </el-col>
            <el-col :span="6">
              邮箱： {{teacherInfo.email}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              现居住地： {{teacherInfo.address}}
            </el-col>
            <el-col :span="12">
              通信地址： {{teacherInfo.postal_address}}
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
              学历类型： {{teacherInfo.degree_type}}
            </el-col>
            <el-col :span="6">
              毕业学校： {{teacherInfo.graduate_school}}
            </el-col>
            <el-col :span="6">
              毕业时间： {{teacherInfo.graduate_time}}
            </el-col>
            <el-col :span="6">
              专业： {{teacherInfo.major}}
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </div>
  </div>

</template>

<script>
import { getTeacherInfo, saveTeacherInfo } from "@/api/teacherMesg";
import { Message } from "element-ui";
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
      if (this.teacherInfo.avator) {
        this.$refs.staffPhoto.fileList = [
          { url: this.teacherInfo.avator, upload: true },
        ];
      }
    },
    // 保存头像
    async saveInfo() {
      // 读取上传的头像
      const fileList = this.$refs.staffPhoto.fileList;
      if (fileList.some((item) => !item.upload)) {
        // 如果此时去找 upload为false的图片 找到了说明 有图片还没有上传完成
        Message.warning("当前图片没有上传完成！");
        return;
      }
      await saveTeacherInfo({
        ...this.teacherInfo,
        avator: fileList && fileList.length ? fileList[0].url : "",
      });
      Message.success('保存头像信息成功!')
    },
  },
};
</script>

<style lang="scss">
.inline-info {
  margin-bottom: 20px;
}
</style>