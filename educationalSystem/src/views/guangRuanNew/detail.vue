<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-container>
        <!-- 标题 -->
        <el-header class="el-header">{{newList[0].new_title}}</el-header>
        <!-- 稿件信息 -->
        <el-main class="el-main-card">
          <el-card shadow="never">
            <el-row
              type="flex"
              justify="space-between"
            >
              <el-col>供稿部门：{{newList[0].depart_feed}}</el-col>
              <el-col>供稿人：{{newList[0].contributor }}</el-col>
              <el-col>摄影：{{newList[0].photographer}}</el-col>
              <el-col>编辑：{{newList[0].edit}}</el-col>
              <el-col>复审：{{newList[0].recheck}}</el-col>
              <el-col>审核：{{newList[0].audit}}</el-col>
            </el-row>
            <br>
            <el-row>
              发布时间：{{newList[0].time | dateFormat}}
            </el-row>
          </el-card>
        </el-main>
        <!-- 主要内容 -->
        <el-main class="el-main-content" v-html="newList[0].content"></el-main>
        <!-- 尾部 -->
        <el-footer class="el-footer">（供稿：{{newList[0].depart_feed}} 初审：{{newList[0].edit}} 复审：{{newList[0].recheck}} 审核：{{newList[0].audit}}）</el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getNewById } from "@/api/guangRuanNew";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newList: [],
    };
  },
  created() {
    this.getNewById();
  },
  methods: {
    async getNewById() {
      let res = await getNewById(this.id);
      this.newList = res.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}
.el-main-card {
  margin-top: -20px;
}
.el-main-content {
  text-indent: 2em;
  font-size: 18px;
  color: #333;
  line-height: 2em;
}
.el-footer {
  text-align: center;
  margin-top: 20px;
}
</style>