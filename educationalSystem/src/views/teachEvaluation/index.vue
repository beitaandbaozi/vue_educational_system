<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-table
        :data="teachEvalData"
        style="width: 100%"
      >
        <el-table-column
          label="课程"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="教师"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="评价"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>