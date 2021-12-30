<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-table
        :data="subCostData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="交费日期"
          width="180"
          prop="sub_date"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="票据号"
          width="180"
          prop="bill_num"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="学年"
          prop="academic"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="费用名称"
          prop="name"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="交费金额"
          prop="sub_money"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="交费性质"
          prop="sub_type"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
     <!-- 回顶 -->
    <el-backtop
      :bottom="60"
      right="0"
    >
      <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        margin-right:0px;
        border-radius:50%;
      }">
        👆
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { getSubCost } from "@/api/subCost";
export default {
  data() {
    return {
      subCostData: [],
    };
  },
  created() {
    this.getSubCost();
  },
  methods: {
    async getSubCost() {
      let res = await getSubCost();
      this.subCostData = res.result;
    },
  },
};
</script>

<style>
</style>