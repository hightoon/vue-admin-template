<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col :xs="30" :sm="30" :lg="10">
        <el-header>最新告警</el-header>
        <div class="chart-wrapper">
          <latest-warning />
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4">
        <el-header>设备总数</el-header>
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="30" :sm="30" :lg="10">
        <el-header>最新故障</el-header>
        <div class="chart-wrapper">
          <latest-fault />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import LatestWarning from './components/LatestWarning'
import LatestFault from './components/LatestFault'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

const deviceData = {
  overall: [2, 3, 0]
}

export default {
  name: 'DashboardAdmin',
  components: {
    LatestWarning,
    PieChart,
    LatestFault
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      deviceOverall: deviceData.overall
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
