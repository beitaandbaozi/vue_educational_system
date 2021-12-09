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
        ref="editCouresRef"
        label-width="100px"
      >
        <el-form-item label="课程代码">
          <el-input
            v-model="editCouresForm.c_id"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="editCouresForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="editCouresForm.credit"></el-input>
        </el-form-item>
        <el-form-item label="考察方式">
          <el-input v-model="editCouresForm.assess"></el-input>
        </el-form-item>
        <el-form-item label="系别">
          <el-input v-model="editCouresForm.duty"></el-input>
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
import { getCourseById, editCouresSubmit } from "@/api/setUpCoures";
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
      editCouresForm: {},
    };
  },
  methods: {
    btnCancel() {
      this.$emit("update:showDialog", false);
    },
    async btnOk() {
      /**
       * 表单验证
       * 连接接口
       * 通知消息
       * 更新数据
       * 通知父组件关闭表单
       */
      await editCouresSubmit(this.editCouresForm.c_id, this.editCouresForm);
      Message.success("编辑课程信息成功！");
      this.$emit("editCoures");
      this.$emit("update:showDialog", false);
    },
    async editCoures(id) {
      let res = await getCourseById(id);
      this.editCouresForm = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>