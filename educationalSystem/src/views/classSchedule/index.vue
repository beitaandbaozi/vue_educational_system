<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 学年和学期选择 -->
      <el-form
        :inline="true"
        :model="scheduleData"
        class="demo-form-inline"
      >
        <el-form-item label="学 年">
          <el-select
            v-model="scheduleData.year"
            placeholder="请输入学年"
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
        </el-form-item>
        <el-form-item label="学 期">
          <el-select
            v-model="scheduleData.term"
            placeholder="请选择学期"
          >
            <el-option
              label="第一学期"
              value="1"
            ></el-option>
            <el-option
              label="第二学期"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getClassSchedule"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 课程表 -->
      <div class='class-table'>
        <div class='table-wrapper'>
          <div class='tabel-container'>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th
                    v-for='(week, index) in weeks'
                    :key='index'
                  > {{'周' + digital2Chinese(index+1, 'week')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for='(item, index) in classTableData'
                  :key='index'
                >
                  <td>
                    <p>{{`${index+1} - ${index+2} 节`}}</p>
                    <p class='period'>{{ item.classestimes }}</p>
                  </td>

                  <td
                    v-for='(week, index) in weeks'
                    :key='index'
                  >
                    {{item[week]  || '-'}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassSchedule } from "@/api/classSchedule";
export default {
  data() {
    return {
      weeks: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      // 学年和学期信息
      scheduleData: {
        year: String(new Date().getFullYear()),
        term: "1",
      },
      //课程内容
      classTableData: [],
    };
  },
  created() {
      this.getClassSchedule();
  },
  methods: {
    /**
     * 数字转中文
     * @param {Number} num 需要转换的数字
     * @param {String} identifier 标识符
     * @returns {String} 转换后的中文
     */
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    },
    //  获取课程表信息
    async getClassSchedule() {
      let res = await getClassSchedule(this.scheduleData);
      this.classTableData = res.result;
    },
    
  },
};
</script>

<style lang="scss" scoped>
.class-table {
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .tabel-container {
    margin: 7px;

    table {
      table-layout: fixed;
      width: 100%;

      thead {
        background-color: #24c0e7dc;
        th {
          color: #fff;
          line-height: 17px;
          font-weight: normal;
        }
      }
      tbody {
        background-color: #eaf2ff;
        td {
          color: #677998;
          line-height: 12px;
        }
      }
      th,
      td {
        width: 60px;
        padding: 12px 2px;
        font-size: 12px;
        text-align: center;
      }

      tr td:first-child {
        color: #333;
        .period {
          font-size: 8px;
        }
      }
    }
  }
}
</style>