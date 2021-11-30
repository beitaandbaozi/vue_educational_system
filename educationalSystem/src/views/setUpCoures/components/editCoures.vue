<template>
  <div>
    <el-dialog
      title="编辑学生"
      :visible="showDialog"
      width="40%"
      @close="btnCancel"
    >
      <el-form
        :model="editCouresForm"
        :rules="editCouresRules"
        ref="editCouresRef"
        label-width="100px"
      >
        <el-form-item label="课程代码">
          <el-input
            v-model="editCouresForm.c_id"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="coures_name"
        >
          <el-input v-model="editCouresForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="学分"
          prop="credit"
        >
          <el-input v-model="editCouresForm.credit"></el-input>
        </el-form-item>
        <el-form-item
          label="考察方式"
          prop="assess"
        >
          <el-input v-model="editCouresForm.assess"></el-input>
        </el-form-item>
        <el-form-item
          label="系别"
          prop="duty"
        >
          <el-input v-model="editCouresForm.duty"></el-input>
        </el-form-item>
        <el-form-item label="上课方式">
          <el-input v-model="editCouresForm.class_type"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input
            v-model="editCouresForm.intro"
            type="textarea"
          ></el-input>
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
import { getCourseById } from "@/api/setUpCoures";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editCouresForm: {},
      editCouresRules: {},
    };
  },
  methods: {
    btnCancel() {
      this.$emit("update:showDialog", false);
    },
    btnOk() {},
    async editCoures(id) {
      let res = await getCourseById(id);
      this.editCouresForm = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>