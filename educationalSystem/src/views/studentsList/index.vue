<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <span slot="before">共录入{{this.total}}名学生</span>
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
      <el-card>
        <el-row :gutter="20">
          <!-- 搜索框 -->
          <el-col :span="6">
            <el-input
              size="small"
              placeholder="请输入学号"
              clearable
              v-model="paramsInfo.query"
              @clear="getAllStudents"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getAllStudents"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-select
              size="small"
              v-model="gradValue"
              clearable
              placeholder="请选择学年"
            >
              <el-option
                label="2018学年"
                value="2018"
              ></el-option>
              <el-option
                label="2019学年"
                value="2019"
              ></el-option>
              <el-option
                label="2020学年"
                value="2020"
              ></el-option>
              <el-option
                label="2021学年"
                value="2021"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 学生信息 -->
        <el-table
          stripe
          border
          :data="studentsList.result"
          style="margin-top:20px"
        >
          <!-- 添加索引页 -->
          <el-table-column
            prop="id"
            label="学号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="stu_name"
            label="名字"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="grad"
            label="年级"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="class"
            label="行政班"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="duty"
            label="系别"
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
          :page-sizes="[5, 10, 15, 20]"
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
import { getAllStudents } from "@/api/studentsList";
export default {
  data() {
    return {
      paramsInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      studentsList: [],
      // 学年
      gradValue:'2018学年'
    };
  },
  created() {
    this.getAllStudents();
  },
  methods: {
    // 获取所有学生信息
    async getAllStudents() {
      let res = await getAllStudents(this.paramsInfo);
      this.studentsList = res;
      this.total = res.count;
    },
    handleSizeChange(newSize) {
      this.paramsInfo.pagesize = newSize;
      this.getAllStudents();
    },
    handleCurrentChange(newPage) {
      this.paramsInfo.pagenum = newPage;
      this.getAllStudents();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>