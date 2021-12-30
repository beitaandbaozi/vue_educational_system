<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools
        :show-before="true"
        v-if="roles == 'admin'"
      >
        <span slot="before">共有{{total}}条快讯</span>
        <template slot="after">
          <el-button
            size="small"
            type="primary"
            plain
            @click="$router.push('/guangRuanNew/addNew')"
          >发布快讯</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-timeline>
          <el-timeline-item
            v-for="item in newList"
            :key="item.id"
            :timestamp="item.time | dateFormat"
            icon="el-icon-hot-water"
            type="primary"
            placement="top"
            size="large"
          >
            <el-card>
              <h3 v-if="item.new_title">{{item.new_title}}</h3>
              <p
                class="p-content"
                v-html="item.content"
              ></p>
              <el-link
                type="primary"
                class="checkMore"
                :underline="false"
                @click="getNewById(item.id)"
              ><i class="el-icon-view el-icon--right"></i>查看详情</el-link>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
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
        🔺
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { getAllNew } from "@/api/guangRuanNew";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
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
    getNewById(id) {
      this.$router.push(`/guangRuanNew/detail/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkMore {
  display: flex;
  justify-content: end;
}
.p-content {
  // 多行文本溢出来替代单行文本溢出的形式
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>