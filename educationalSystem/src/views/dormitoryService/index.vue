<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--信息-->
      <el-card>
        <el-row
          type="flex"
          justify="space-around"
        >
          <el-col :span="6">
            学号：{{stuForm.number}}
          </el-col>
          <el-col :span="6">
            姓名：{{stuForm.name}}
          </el-col>
          <el-col :span="6">
            宿舍号：{{stuForm.dormitory}}
          </el-col>
        </el-row>
      </el-card>
      <!-- 报修流程 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <h3>网上报修流程</h3>
        </el-col>
      </el-row>
      <div style="height: 300px;">
        <el-steps
          align-center
          :active="6"
        >
          <el-step
            title="填写报修单"
            description="填写预约维修内容、维修时间"
          >填写预约维修内容、维修时间</el-step>
          <el-step
            title="提交等待处理"
            description="确认您的报修数据正确并提交处理，只有提交处理的报修申请记录才能被受理"
          ></el-step>
          <el-step
            title="到总务处缴费"
            description="a、如果维修费用为0，则无需此步骤 b、如果维修费用大于0，则需要到 总务处 缴纳相应的维修费用"
          ></el-step>

          <el-step
            title="维修人员上门维修"
            description="请在您预约的维修时间内等待维修人员上门维修"
          ></el-step>
          <el-step
            title="签名确认"
            description="在维修单上对维修结果（选择）打钩并签名"
          ></el-step>
          <el-step
            title="网上反馈"
            description="对维修服务、维修结果等进行评价，同时提出您宝贵的意见或者建议，谢谢！"
          ></el-step>
        </el-steps>
        <!-- 注意事项 -->
        <i
          class="el-icon-warning"
          style="padding-left:20px;margin-top:10px;color:red"
        >
          如果在您预约的维修时间内维修人员上门维修但您宿舍没有人在，则视该维修单为无效，您需要重新填写报修单。总务处咨询电话：87818812
        </i>
      </div>
      <!-- 报修记录 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <h3>您所在宿舍及您以往申请的报修记录</h3>
        </el-col>
      </el-row>
      <el-table
        :data="serviceRecordData.result"
        border
        style="width: 100%;"
      >
        <el-table-column
          align="center"
          prop="service_type"
          label="维修种类"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="维修内容"
          prop="content"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="情况描述"
          prop="service_mode"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="service_state"
          width="50"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="维修费用"
          prop="service_price"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="申请维修时间"
          prop="apply_time"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="星期"
          prop="service_week"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="宿舍编号"
          prop="dormitory_id"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="申请人"
          prop="apply_person"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="联系电话"
          prop="tel"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStuInfo } from "@/api/stuMesg";
import { getServiceRecord } from "@/api/dormitoryService";
export default {
  data() {
    return {
      stuForm: {
        number: "",
        name: "",
        dormitory: "",
      },
      //  宿舍报修记录
      serviceRecordData: [],
    };
  },
  async created() {
    await this.getStuInfo();
    await this.getServiceRecord();
  },
  methods: {
    //  获取个人信息
    async getStuInfo() {
      let res = await getStuInfo();
      // 给表单赋值
      this.stuForm = res;
    },
    // 获取报修记录信息
    async getServiceRecord() {
      let res = await getServiceRecord(this.stuForm);
      this.serviceRecordData = res;
    },
  },
};
</script>

<style>
</style>