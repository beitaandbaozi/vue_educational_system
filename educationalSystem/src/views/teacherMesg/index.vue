<template>
<div class="dashboard-container">
    <div class="app-container">
        <el-tabs v-model="activename">
            <el-tab-pane label="基础信息" name="first">基础信息</el-tab-pane>
            <el-tab-pane label="通讯信息" name="second">通讯信息</el-tab-pane>
            <el-tab-pane label="教育信息" name="third">教育信息</el-tab-pane>
        </el-tabs>
    </div>
</div>

</template>

<script>
export default {
  data() {
    return {
        // Tab页激活
        activename:'first'
     
      
    };
  },
};
</script>

<style>
</style>