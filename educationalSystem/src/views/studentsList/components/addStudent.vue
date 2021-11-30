<template>
  <div>
    <el-dialog
      title="添加学生"
      :visible="showDialog"
      width="50%"
      @close="btnCancel"
    >
      <el-form
        :model="addStudentForm"
        :rules="addStudentRules"
        ref="addStudentRef"
        label-width="80px"
      >
        <el-form-item
          label="学号"
          prop="id"
        >
          <el-input v-model="addStudentForm.id"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="stu_name"
        >
          <el-input v-model="addStudentForm.stu_name"></el-input>
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grad"
        >
          <el-input
            v-model="addStudentForm.grad"
            placeholder="(2018、2019、2020、2021)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="行政班"
          prop="class"
        >
          <el-input v-model="addStudentForm.class"></el-input>
        </el-form-item>
        <el-form-item
          label="专业"
          prop="major"
        >
          <el-input v-model="addStudentForm.major"></el-input>
        </el-form-item>
        <el-form-item
          label="身份证"
          prop="idCard"
        >
          <el-input v-model="addStudentForm.idCard"></el-input>
        </el-form-item>
        <el-form-item
          label="邮件"
          prop="email"
        >
          <el-input v-model="addStudentForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="导师"
          prop="advisor"
        >
          <el-input v-model="addStudentForm.advisor"></el-input>
        </el-form-item>
        <el-form-item
          label="辅导员"
          prop="counsellor"
        >
          <el-input v-model="addStudentForm.counsellor"></el-input>
        </el-form-item>
        <el-form-item
          label="宿舍号"
          prop="dormitory"
        >
          <el-input v-model="addStudentForm.dormitory"></el-input>
        </el-form-item>
        <el-form-item
          label="系别"
          prop="duty"
        >
          <el-input v-model="addStudentForm.duty"></el-input>
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
import { Message } from "element-ui";
import { addStudentSubmit } from "@/api/studentsList";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addStudentForm: {
        id: "",
        stu_name: "",
        grad: "",
        class: "",
        major: "",
        email: "",
        idCard: "",
        advisor: "",
        counsellor: "",
        dormitory: "",
        duty: "",
      },
      addStudentRules: {
        id: [
          { required: true, message: "请输入学号!", trigger: "blur" },
          { min: 10, message: "学号长度最小为10！", trigger: "blur" },
        ],
        stu_name: [{ required: true, message: "请输入姓名!", trigger: "blur" }],
        grad: [{ required: true, message: "请输入年级!", trigger: "blur" }],
        class: [{ required: true, message: "请输入行政班!", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业!", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        advisor: [{ required: true, message: "请输入导师!", trigger: "blur" }],
        counsellor: [
          { required: true, message: "请输入辅导员!", trigger: "blur" },
        ],
        duty: [{ required: true, message: "请输入系别!", trigger: "blur" }],
        dormitory: [
          { required: true, message: "请输入宿舍号!", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
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
      this.addStudentForm = {};
      this.$refs.addStudentRef.resetFields();
      this.$emit("update:showDialog", false);
    },
    btnOk() {
      /**
       * 表单验证
       * 连接接口
       * 通知父组件关闭对话框
       * 通知父组件更新学生表
       */
      this.$refs.addStudentRef.validate(async (valid) => {
        if (!valid) return;
        await addStudentSubmit(this.addStudentForm);
        Message.success("添加学生信息成功！");
        this.$emit("addStudent");
        this.$emit("update:showDialog", false);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>