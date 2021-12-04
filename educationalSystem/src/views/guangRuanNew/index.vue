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
          >发布快讯</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-timeline>
          <el-timeline-item
            v-for="item in newList"
            :key="item.id"
            :timestamp="item.time"
            icon="el-icon-hot-water"
            type="primary"
            placement="top"
            size="large"
          >
            <el-card>
              <h3>{{item.title}}</h3>
              <p>{{item.content}}</p>
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
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkMore {
  display: flex;
  justify-content: end;
}
</style>