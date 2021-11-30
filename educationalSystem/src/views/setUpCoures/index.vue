<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共有{{total}}门课程</span>
        <template slot="after">
          <el-row>
            <el-col>
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
          </el-row>
        </template>
      </page-tools>
      <el-card>
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
            width="100"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="课程名称"
            align="center"
            width="190"
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
            width="100"
          ></el-table-column>
          <el-table-column
            prop="class_type"
            label="上课方式"
            align="center"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="intro"
            label="课程介绍"
            align="center"
          ></el-table-column>
          <!-- 操作按钮  当用户角色为管理员里再补上-->
          <el-table-column
            label="操作"
            align="center"
            v-if="roles == 'admin'"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                plain
                size="mini"
                type="primary"
                @click="editCoures(scope.row.c_id)"
              >编辑</el-button>
              <el-button
                plain
                size="mini"
                type="danger"
                @click="delCoures(scope.row.c_id)"
              >删除</el-button>
            </template>
          </el-table-column>
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
    <!-- 编辑课程对话框 -->
    <edit-coures
      :show-dialog.sync="editCouresDialog"
      ref="editCouresRef"
      @editCoures="getSetUpCourse"
    ></edit-coures>
  </div>
</template>

<script>
import { getSetUpCourse } from "@/api/setUpCoures";
import { mapGetters } from "vuex";
import editCoures from "./components/editCoures.vue";
export default {
  components: {
    editCoures,
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  data() {
    return {
      classList: [],
      paramsInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      editCouresDialog: false,
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
    // 编辑开设课程
    editCoures(id) {
      // 打开编辑对话框
      this.editCouresDialog = true;
      // 触发函数
      this.$refs.editCouresRef.editCoures(id.trim());
    },
    // 删除开设课程
    delCoures(id) {},
  },
};
</script>

<style>
</style>