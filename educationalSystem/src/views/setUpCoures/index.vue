<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 搜索框 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              size="small"
              placeholder="请输入课程代码"
              clearable
              v-model="paramsInfo.query"
              @clear="getSetUpCourse"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getSetUpCourse"
              ></el-button>
            </el-input>
          </el-col>
          <!-- 添加课程 -->
          <!-- 当用户角色为管理员时添加  v-if -->
        </el-row>
        <!-- 开设课程信息 -->
        <el-table
          stripe
          border
          :data="classList.result"
          style="margin-top:20px"
        >
          <!-- 添加索引页 -->
          <el-table-column
            prop="c_id"
            label="课程代码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="credit"
            label="学分"
            align="center"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="assess"
            label="考察方式"
            align="center"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="duty"
            label="系别"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="class_type"
            label="上课方式"
            align="center"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="intro"
            label="简介"
            width="500"
            align="center"
          ></el-table-column>
          <!-- 操作按钮  当用户角色为管理员里再补上-->
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
          style="margin-top:20px;display:flex;justify-content:end"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paramsInfo.pagenum"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="paramsInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getSetUpCourse } from "@/api/setUpCoures";
export default {
  data() {
    return {
      classList: [],
      paramsInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
    };
  },
  created() {
    this.getSetUpCourse();
  },
  methods: {
    // 获取所有开设课程
    async getSetUpCourse() {
      let res = await getSetUpCourse(this.paramsInfo);
      this.classList = res;
      this.total = res.count;
    },
    handleSizeChange(newSize) {
      this.paramsInfo.pagesize = newSize;
      this.getSetUpCourse();
    },
    handleCurrentChange(newPage) {
      this.paramsInfo.pagenum = newPage;
      this.getSetUpCourse();
    },
  },
};
</script>

<style>
</style>