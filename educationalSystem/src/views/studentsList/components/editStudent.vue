<template>
  <div>
    <el-dialog
      title="编辑学生"
      :visible="showDialog"
      width="50%"
      @close="btnCancel"
    >
      <el-form
        :model="editStudentForm"
        :rules="editStudentRules"
        ref="editStudentRef"
        label-width="80px"
      >
        <el-form-item
          label="学号"
          prop="id"
        >
          <el-input
            v-model="editStudentForm.id"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
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
        name: [{ required: true, message: "请输入姓名!", trigger: "blur" }],
        grad: [{ required: true, message: "请输入年级！", trigger: "blur" }],
        class: [{ required: true, message: "请输入行政班！", trigger: "blur" }],
        duty: [{ required: true, message: "请输入系别！", trigger: "blur" }],
      },
    };
  },
  methods: {
    btnOk() {},
    btnCancel() {},
  },
};
</script>

<style lang="scss" scoped>
</style>