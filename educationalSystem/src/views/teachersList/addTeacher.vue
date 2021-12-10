<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-form
        :model="addTeacherForm"
        :rules="addTeacherRules"
        ref="addTeacherRef"
        label-width="80px"
        size="small"
        label-position='left'
      >
        <el-divider
          content-position="center"
          class="el-divider-content"
        >基本信息</el-divider>
        <el-form-item
          label="工号"
          prop="num"
        >
          <el-input v-model="addTeacherForm.num"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input v-model="addTeacherForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-input v-model="addTeacherForm.sex"></el-input>
        </el-form-item>
        <el-form-item
          label="系别"
          prop="duty"
        >
          <el-input v-model="addTeacherForm.duty"></el-input>
        </el-form-item>
        <el-form-item
          label="入职时间"
          prop="entry_time"
        >
          <el-input v-model="addTeacherForm.entry_time"></el-input>
        </el-form-item>
        <el-form-item
          label="聘用形式"
          prop="hire_form"
        >
          <el-input v-model="addTeacherForm.hire_form"></el-input>
        </el-form-item>
        <el-form-item
          label="最高学历"
          prop="education_bgc"
        >
          <el-select
            v-model="addTeacherForm.education_bgc"
            placeholder="请选择"
          >
            <el-option
              label="专科"
              value="专科"
            ></el-option>
            <el-option
              label="本科"
              value="本科"
            ></el-option>
            <el-option
              label="硕士"
              value="硕士"
            ></el-option>
            <el-option
              label="博士"
              value="博士"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="籍贯"
          prop="native_place"
        >
          <el-input v-model="addTeacherForm.native_place"></el-input>
        </el-form-item>
        <el-form-item
          label="政治面貌"
          prop="politics_status"
        >
          <el-select
            v-model="addTeacherForm.politics_status"
            placeholder="请选择"
          >
            <el-option
              label="群众"
              value="群众"
            ></el-option>
            <el-option
              label="团员"
              value="团员"
            ></el-option>
            <el-option
              label="中共预备党员"
              value="中共预备党员"
            ></el-option>
            <el-option
              label="党员"
              value="党员"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-divider
          content-position="center"
          class="el-divider-content"
        >通讯信息</el-divider>
        <el-form-item
          label="手机号码"
          prop="mobile"
        >
          <el-input v-model="addTeacherForm.mobile"></el-input>
        </el-form-item>
        <el-form-item
          label="QQ"
          prop="qq_number"
        >
          <el-input v-model="addTeacherForm.qq_number"></el-input>
        </el-form-item>
        <el-form-item
          label="微信"
          prop="wechat"
        >
          <el-input v-model="addTeacherForm.wechat"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="addTeacherForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="现居住地"
          prop="address"
        >
          <el-input v-model="addTeacherForm.address"></el-input>
        </el-form-item>
        <el-form-item
          label="通讯地址"
          prop="postal_address"
        >
          <el-input v-model="addTeacherForm.postal_address"></el-input>
        </el-form-item>
        <el-divider
          content-position="center"
          class="el-divider-content"
        >教育信息</el-divider>
        <el-form-item
          label="学历类型"
          prop="degree_type"
        >
          <el-select
            v-model="addTeacherForm.degree_type"
            placeholder="请选择"
          >
            <el-option
              label="统招"
              value="统招"
            ></el-option>
            <el-option
              label="非统招"
              value="非统招"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="毕业学校"
          prop="graduate_school"
        >
          <el-input v-model="addTeacherForm.graduate_school"></el-input>
        </el-form-item>
        <el-form-item
          label="毕业时间"
          prop="graduate_time"
        >
          <el-input v-model="addTeacherForm.graduate_time"></el-input>
        </el-form-item>
        <el-form-item
          label="专业"
          prop="major"
        >
          <el-input v-model="addTeacherForm.major"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交按钮 -->
      <el-row
        type="flex"
        justify="end"
      >
        <el-button
          type="warning"
          plain
          @click="addTeacher"
        >提交添加教师信息</el-button>
      </el-row>
      <!-- 回顶 -->
      <el-backtop :bottom="50">
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
          Top
        </div>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { validMobile } from "@/utils/validate";
import { addTeacher } from "@/api/teachersList";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // 手机号校验规则
    const validateMobile = (rule, value, callback) => {
      validMobile(value)
        ? callback()
        : callback(new Error("手机号码格式不正确！"));
    };
    return {
      addTeacherForm: {
        num: "",
        name: "",
        sex: "",
        duty: "",
        entry_time: "",
        hire_form: "",
        education_bgc: "",
        native_place: "",
        politics_status: "",
        mobile: "",
        qq_number: "",
        wechat: "",
        email: "",
        address: "",
        postal_address: "",
        degree_type: "",
        graduate_school: "",
        graduate_time: "",
        major: "",
      },
      addTeacherRules: {
        num: [
          { required: true, message: "请输入工号!", trigger: "blur" },
          { min: 4, message: "工号最小长度为4！", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入姓名!", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别!", trigger: "blur" }],
        duty: [{ required: true, message: "请输入系别!", trigger: "blur" }],
        entry_time: [
          { required: true, message: "请输入入职时间!", trigger: "blur" },
        ],
        hire_form: [
          {
            required: true,
            message: "请输入聘用形式!",
            trigger: "blur",
          },
        ],
        education_bgc: [
          { required: true, message: "请输入最高学历!", trigger: "blur" },
        ],
        native_place: [
          { required: true, message: "请输入籍贯!", trigger: "blur" },
        ],
        politics_status: [
          { required: true, message: "政治面貌不能为空!", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号码不能为空！", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" },
        ],
        qq_number: [
          { required: true, message: "请输入QQ号!", trigger: "blur" },
          {
            min: 8,
            max: 10,
            message: "QQ号最小长度为8,最大长度为10",
            trigger: "blur",
          },
        ],
        wechat: [
          {
            required: true,
            message: "请输入微信号!",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          { required: true, message: "请输入现居住地!", trigger: "blur" },
        ],
        postal_address: [
          { required: true, message: "请输入通讯地址!", trigger: "blur" },
        ],
        degree_type: [
          { required: true, message: "学历类型不能为空!", trigger: "blur" },
        ],
        graduate_school: [
          { required: true, message: "毕业学校不能为空!", trigger: "blur" },
        ],
        graduate_time: [
          { required: true, message: "毕业时间不能为空!", trigger: "blur" },
        ],
        major: [
          { required: true, message: "请输入专业名称!", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    btnCancel() {
      /**
       * 清空表单
       * 清楚校验规则
       * 通知父组件关闭对话框
       */
      //   this.addStudentForm = {};
      //   this.$refs.addTeacherRef.resetFields();
      //   this.$emit("update:showDialog", false);
    },
    addTeacher() {
      this.$refs.addTeacherRef.validate(async (valid) => {
        if (!valid) return;
        await addTeacher(this.addTeacherForm);
        Message.success("添加教师信息成功！");
        // 表单清空
        this.addTeacherForm = {};
        // 清楚校验规则(后续加了Tab后看是否要使用这个操作)
        // 回退
        this.$router.go(-1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-divider {
  background-color: transparent;
}
.el-divider-content {
  margin: 25px 0px;
  .el-divider__text {
    color: darkorange;
    font-size: 20px;
  }
}
</style>