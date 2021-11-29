<template>
  <div>
    <el-dialog
      title="编辑学生"
      :visible="showDialog"
      width="40%"
      @close="btnCancel"
    >
      <el-form
        :model="editStudentForm"
        :rules="editStudentRules"
        ref="editStudentRef"
        label-width="80px"
      >
        <el-form-item label="学号">
          <el-input
            v-model="editStudentForm.id"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="stu_name"
        >
          <el-input v-model="editStudentForm.stu_name"></el-input>
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grad"
        >
          <el-input v-model="editStudentForm.grad"></el-input>
        </el-form-item>
        <el-form-item
          label="行政班"
          prop="class"
        >
          <el-input v-model="editStudentForm.class"></el-input>
        </el-form-item>
        <el-form-item
          label="系别"
          prop="duty"
        >
          <el-input v-model="editStudentForm.duty"></el-input>
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
import { editStudentById, editStudentSubmit } from "@/api/studentsList";
import { Message } from "element-ui";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editStudentForm: {},
      editStudentRules: {
        stu_name: [{ required: true, message: "请输入姓名!", trigger: "blur" }],
        grad: [{ required: true, message: "请输入年级！", trigger: "blur" }],
        class: [{ required: true, message: "请输入行政班！", trigger: "blur" }],
        duty: [{ required: true, message: "请输入系别！", trigger: "blur" }],
      },
    };
  },
  methods: {
    btnOk() {
      /**
       * 表单验证
       * 连接接口
       * 通知消息
       * 更新数据
       * 通知父组件关闭表单
       */
      this.$refs.editStudentRef.validate(async (valid) => {
        if (!valid) return;
        await editStudentSubmit(this.editStudentForm.id, this.editStudentForm);
        Message.success("编辑学生信息成功！");
        this.$emit("editStudent");
        this.$emit("update:showDialog", false);
      });
    },
    btnCancel() {
      // 清空表单
      this.editStudentForm = {};
      // 清除校验规则
      this.$refs.editStudentRef.resetFields();
      // 关闭对话框
      this.$emit("update:showDialog", false);
    },
    async editStudent(id) {
      let res = await editStudentById(id);
      this.editStudentForm = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>