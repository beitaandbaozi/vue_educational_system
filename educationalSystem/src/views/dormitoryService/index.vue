<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 报修流程 -->
      <div style="height: 300px;">
        <el-steps
          align-center
          :active="6"
        >
          <el-step title="填写报修单" description="填写预约维修内容、维修时间">填写预约维修内容、维修时间</el-step>
          <el-step title="提交等待处理" description="确认您的报修数据正确并提交处理，只有提交处理的报修申请记录才能被受理"></el-step>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>