<template>
  <div>
    <el-dialog
      title="编辑教师"
      :visible="showDialog"
      width="40%"
      @close="btnCancel"
    >
      <el-form
        :model="editTeacherForm"
        :rules="editTeacherRules"
        ref="editTeacherRef"
        label-width="80px"
      >
        <el-form-item label="工号">
          <el-input
            v-model="editTeacherForm.num"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input v-model="editTeacherForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-input v-model="editTeacherForm.sex"></el-input>
        </el-form-item>
        <el-form-item
          label="系别"
          prop="duty"
        >
          <el-input v-model="editTeacherForm.duty"></el-input>
        </el-form-item>
        <el-form-item
          label="聘用形式"
          prop="hire_form"
        >
          <el-input v-model="editTeacherForm.hire_form"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="mobile"
        >
          <el-input v-model="editTeacherForm.mobile"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="editTeacherForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="btnCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="btnOk"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTeacherByNum, editTeacherSubmit } from "@/api/teachersList";
import { validMobile } from "@/utils/validate";
import { Message } from "element-ui";
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
      editTeacherForm: {},
      editTeacherRules: {
        name: [{ required: true, message: "姓名不能为空!", trigger: "blur" }],
        sex: [{ required: true, message: "性别不能为空！", trigger: "blur" }],
        duty: [{ required: true, message: "系别不能为空！", trigger: "blur" }],
        hire_form: [
          { required: true, message: "聘用形式不能为空！", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号码不能为空！", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空！", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    // 通过id获取对应工号的教师资料
    async editTeacherById(id) {
      let res = await getTeacherByNum(id);
      this.editTeacherForm = res.result;
    },
    btnOk() {
      /**
       * 表单验证
       * 连接接口
       * 通知消息
       * 更新数据
       * 通知父组件关闭表单
       */
      this.$refs.editTeacherRef.validate(async (valid) => {
        if (!valid) return;
        await editTeacherSubmit(this.editTeacherForm.num, this.editTeacherForm);
        Message.success("编辑学生信息成功！");
        this.$emit("updateTeachersList");
        this.$emit("update:showDialog", false);
      });
    },
    btnCancel() {
      // 清空表单
      this.editTeacherForm = {};
      // 清除校验规则
      this.$refs.editTeacherRef.resetFields();
      // 关闭对话框
      this.$emit("update:showDialog", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>