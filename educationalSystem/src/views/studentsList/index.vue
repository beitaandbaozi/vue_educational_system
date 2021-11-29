<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <span slot="before">共有{{this.total}}名学生</span>
        <template slot="after">
          <el-button
            size="small"
            type="success"
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
        <el-row type="flex">
          <!-- 搜索框 -->
          <el-col
            :span="6"
            style="margin-right: 35px"
          >
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
          <el-col :span="12">
            <!-- 学年 -->
            <el-col :span="6">
              <el-select
                size="small"
                v-model="searchData.gradValue"
                clearable
                placeholder="请选择学年"
                @change="searchStudent"
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
            <!-- 系别 -->
            <el-col :span="6">
              <el-select
                size="small"
                v-model="searchData.dutyValue"
                clearable
                placeholder="请选择系别"
                @change="searchStudent"
              >
                <el-option
                  v-for="item in dutyOptions"
                  :key="item.duty"
                  :label="item.duty"
                  :value="item.duty"
                >
                </el-option>
              </el-select>
            </el-col>
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
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-tooltip
                effect="dark"
                content="编辑"
                placement="top-start"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editStu(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-tooltip
                effect="dark"
                content="删除"
                placement="top-start"
                :enterable="false"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delStu(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <!-- 详情 -->
              <el-tooltip
                effect="dark"
                content="详情"
                placement="top-start"
                :enterable="false"
              >
                <el-button
                  type="info"
                  icon="el-icon-star-off"
                  size="mini"
                  @click="detailByStu(scope.row.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
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
    <!-- 编辑学生对话框组件 -->
    <edit-student
      :show-dialog.sync="editStuDialog"
      ref="editStudentRef"
      @editStudent="getAllStudents"
    ></edit-student>
  </div>
</template>

<script>
import {
  getAllStudents,
  getAllDuty,
  searchByStudents,
} from "@/api/studentsList";
import editStudent from "./components/editStudent.vue";
export default {
  components: {
    editStudent,
  },
  data() {
    return {
      paramsInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      studentsList: [],
      searchData: {
        // 学年
        gradValue: "",
        dutyValue: "",
      },
      // 系别选项
      dutyOptions: [],
      // 编辑学生对话框
      editStuDialog: false,
    };
  },
  created() {
    this.getAllStudents();
    this.getAllDuty();
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
    // 获取所有系别
    async getAllDuty() {
      let res = await getAllDuty();
      this.dutyOptions = res.result;
    },
    // 根据系别和学年来查询学生数据
    async searchStudent() {
      let res = await searchByStudents(this.searchData);
      this.studentsList = res;
      this.total = res.count;
    },
    // 根据学号编辑学生信息
    editStu(num) {
      /**
       * 打开编辑学生的对话框
       * 将值渲染到对应的表单
       *
       */
      this.editStuDialog = true;
      this.$refs.editStudentRef.editStudent(num);
    },
    delStu(num) {
      console.log(num);
    },
    detailByStu(num) {
      console.log(num);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>