<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column v-for="attribute in tableThread" :key="attribute" :label="attribute" width="100">
        <template slot-scope="scope">
          {{ scope.row[attribute] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices, getTimeSeries, getDeviceInfo } from '@/utils/tbclient'
import { getTBToken } from '@/utils/auth'

const fullTableThread = ['设备序号', '设备序列号', '硬件版本号', '软件版本号', '总运行时间', '总上电时间',
  '总运行次数', '总故障次数', '操作模式', '运行模式', '喘振模式', '系统状态', '故障代码', '警告代码', '当前设定值',
  '排放压力', '过滤阻力', '入口流量', '入口温度', '出口温度', '电机温度', '变频器温度', '电机转速', '变频器母线电压',
  '电机电流', '电机功率', '电网电流', '电网功率', '喘振保护纸', '累计电量']

const fakeData = [
  {设备序号: 1, 设备序列号: 'abc-123', 硬件版本号: '1.0', 软件版本号: '2.0', 总运行时间: 10, 总上电时间: 100,
  总运行次数: 200, 总故障次数: 100},
]

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      tableThread: fullTableThread
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.list = fakeData
      this.listLoading = false
      /* getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      }) */
    }
  }
}
</script>
