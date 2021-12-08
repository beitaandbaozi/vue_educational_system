<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div
    ref="myDiv"
    class="radar-echart"
  />
</template>

<script>
// 完成加载过程
// var echarts = require('echarts')
var echarts = require("echarts/lib/echarts"); // 引入echarts主模块
require("echarts/lib/chart/pie"); // 引入雷达图
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv); // 得到图表实例
    myChart.setOption({
      title: {
        text: "广软各系人数",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        top: "bottom",
        data: [
          "软件系",
          "电子系",
          "计算机系",
          "网络系",
          "外语系",
          "管理系",
          "财经系",
          "数码系",
          "游戏系"
        ],
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Area Mode",
          type: "pie",
          radius: [20, 140],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 5,
          },
          data: [
            { value: 1000, name: "软件系" },
            { value: 928, name: "电子系" },
            { value: 826, name: "计算机系" },
            { value: 724, name: "网络系" },
            { value: 622, name: "管理系" },
            { value: 520, name: "数码系" },
            { value: 519, name: "游戏系" },
            { value: 418, name: "财经系" },
            { value: 416, name: "外语系" }
          ],
        },
      ],
    });
  },
};
</script>

<style>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>