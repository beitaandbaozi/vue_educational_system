<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="6">
            <h3>教师评价</h3>
          </el-col>
        </el-row>
        <el-table
          :data="teachEvalData.result"
          border
          style="width: 100%;"
        >
          <el-table-column
            label="课程代码"
            width="200"
            prop="cno"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="课程名称"
            prop="name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="教师"
            prop="teacher_name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="工号"
            prop="teacher_id"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="评价"
            align="center"
          >
            <template slot-scope="{row}">
              <el-rate
                v-model="row.evaluation"
                :colors="colors"
                @change="getValue(row.$index)"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            label="总评"
            width="120"
            align="center"
            prop="evaluation"
          >
          </el-table-column>
        </el-table>

      </el-card>

    </div>
  </div>
</template>

<script>
import { getCourse } from "@/api/teachEvaluation";
export default {
  data() {
    return {
      teachEvalData: [],
      // 辅助文字
      texts: ["非常不满意", "不满意", "一般", "满意"],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  created() {
    this.getCourse();
  },
  methods: {
    async getCourse() {
      let res = await getCourse();
      this.teachEvalData = res;
    },
    getValue(index) {},
    getValueName(value) {
      switch (value) {
        case 1:
          return "非常不满意";
        case 2:
          return "不满意";
        case 3:
          return "一般";
        case 4:
          return "满意";
        case 5:
          return "非常满意";
        // return null
      }
    },
  },
};
</script>

<style>
</style>