<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
          >导入</el-button>
          <el-button
            size="small"
            type="danger"
          >导出</el-button>
          <el-button
            size="small"
            type="primary"
          >新增学生</el-button>
        </template>
      </page-tools>
      <!-- 学生列表 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>