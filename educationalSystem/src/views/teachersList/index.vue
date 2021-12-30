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
            @click="$router.push('./import?type=teacher')"
          >excel导入</el-button>
          <el-button
            size="small"
            type="danger"
            plain
            @click="excelExport"
          >excel导出</el-button>
          <el-button
            size="small"
            type="primary"
            plain
            @click="$router.push('/teachersList/addTeacher')"
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
                  @click="delTeacher(scope.row.num)"
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
                  @click="$router.push(`/teachersList/detail/${scope.row.num}`)"
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
      @updateTeachersList="getAllTeachers"
    ></edit-teacher>
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
        ♥
      </div>
    </el-backtop>
  </div>
  
</template>

<script>
import {
  getAllTeachers,
  delTeacherByNum,
  getAllTeachersByExcel,
} from "@/api/teachersList";
import editTeacher from "./components/editTeacher.vue";
import { Message } from "element-ui";
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
      this.getAllTeachers();
    },
    handleCurrentChange(newPage) {
      this.paramsInfo.pagenum = newPage;
      this.getAllTeachers();
    },
    // 编辑教师
    editTeacher(id) {
      // 开启对话框
      this.editTeacherDialog = true;
      // id传递给子组件，控制子组件响应对应的方法
      this.$refs.editTeacherRef.editTeacherById(id);
    },
    // 删除教师
    async delTeacher(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该教师, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((error) => error);
      if (confirmResult != "confirm") {
        return Message.info("已经取消删除！");
      }
      await delTeacherByNum(id);
      Message.success("删除该教师成功！");
      this.getAllTeachers();
    },
    // excel导出
    excelExport() {
      // 表头对应关系
      const headers = {
        工号: "num",
        姓名: "name",
        性别: "sex",
        部门: "duty",
        入职时间: "entry_time",
        聘用形式: "hire_form",
        最高学历: "education_bgc",
        籍贯: "native_place",
        政治面貌: "politics_status",
        手机: "mobile",
        QQ: "qq_number",
        微信: "wechat",
        邮箱: "email",
        现居住地: "address",
        通讯地址: "postal_address",
        学历类型: "degree_type",
        毕业学校: "graduate_school",
        毕业时间: "graduate_time",
        专业: "major",
      };
      // 懒加载
      import("@/vendor/Export2Excel").then(async (excel) => {
        let { result } = await getAllTeachersByExcel();
        const data = this.formatJson(headers, result);
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: "教师信息表",
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    },
    // 将数组转化成二维数组 [{}] => [[]]
    formatJson(headers, result) {
      /**
       * result:[{}]
       * item是对象  => 转化成只有值的数组 => 数组值的顺序依赖headers  {username: '张三'
       * Object.keys(headers): ["姓名", "手机号", "入职日期", "聘用形式", "转正日期", "工号", "部门"]
       * headers[key]   对应的英文名字
       * item(headers[key])   返回对应英文名字的值  因为他是一个对象
       * map  返回的是数组
       */
      return result.map((item) => {
        // item是一个对象 {id: '1740916212', stu_name: '静香',...}
        return Object.keys(headers).map((key) => {
          return item[headers[key]];
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>