<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <el-timeline>
        <el-timeline-item
          v-for="item in newList"
          :key="item.id"
          :timestamp="item.time"
          icon="el-icon-hot-water"
          type="primary"
          placement="top"
        >
          <el-card>
            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- 分页条 -->
      <el-pagination
        style="margin-top:20px;display:flex;justify-content:end"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paramsInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="paramsInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllNew } from "@/api/guangRuanNew";
export default {
  data() {
    return {
      // 分页条数据
      paramsInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      newList: [],
    };
  },
  created() {
    this.getAllNew();
  },
  methods: {
    async getAllNew() {
      let res = await getAllNew(this.paramsInfo);
      this.newList = res.result;
      this.total = res.count;
    },
    handleSizeChange(newSize) {
      this.paramsInfo.pagesize = newSize;
      this.getAllNew();
    },
    handleCurrentChange(newPage) {
      this.paramsInfo.pagenum = newPage;
      this.getAllNew();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>