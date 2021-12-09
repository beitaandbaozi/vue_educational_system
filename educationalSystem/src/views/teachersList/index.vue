<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <span slot="before">共有{{this.total}}名教师</span>
        <template slot="after">
          <el-button
            size="small"
            type="success"
            plain
          >excel导入</el-button>
          <el-button
            size="small"
            type="danger"
            plain
          >excel导出</el-button>
          <el-button
            size="small"
            type="primary"
            plain
          >新增教师</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- 搜索框 -->
        <el-row>
          <el-col
            :span="6"
            style="margin-right: 35px"
          >
            <el-input
              size="small"
              placeholder="请输入工号"
              clearable
              v-model="paramsInfo.query"
              @clear="getAllTeachers"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getAllTeachers"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>

        <!-- 教师区域 -->
        <el-table
          stripe
          border
          :data="teachersList"
          style="margin-top:20px"
        >
          <!-- 添加索引页 -->
          <el-table-column
            prop="num"
            label="工号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="duty"
            label="系别"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="hire_form"
            label="聘用形式"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
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
                  plain
                  @click="editTeacher(scope.row.num)"
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
                  plain
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
                  plain
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页数据 -->
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
    <!-- 编辑教师组件 -->
    <edit-teacher
      :show-dialog.sync="editTeacherDialog"
      ref="editTeacherRef"
    ></edit-teacher>
  </div>
</template>

<script>
import { getAllTeachers } from "@/api/teachersList";
import editTeacher from "./components/editTeacher.vue";
export default {
  components: {
    editTeacher,
  },
  data() {
    return {
      // 教师数据
      teachersList: [],
      // 分页条数据
      paramsInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 数据总数
      total: 0,
      // 编辑对话框
      editTeacherDialog: false,
    };
  },
  created() {
    this.getAllTeachers();
  },
  methods: {
    //  获取全部教师数据
    async getAllTeachers() {
      let res = await getAllTeachers(this.paramsInfo);
      this.teachersList = res.result;
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
    // 编辑教师
    editTeacher(id) {
      // 开启对话框
      this.editTeacherDialog = true;
      // id传递给子组件，控制子组件响应对应的方法
      this.$refs.editTeacherRef.editTeacherById(id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>