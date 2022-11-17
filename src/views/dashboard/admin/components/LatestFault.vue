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
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" width="80">
        <template slot-scope="scope">
          {{ scope.row[0] }}
        </template>
      </el-table-column>
      <el-table-column label="终端客户" width="80">
        <template slot-scope="scope">
          {{ scope.row[1] }}
        </template>
      </el-table-column>
      <el-table-column label="设备型号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[2] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="故障码" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[3] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices, getTimeSeries, getDeviceInfo } from '@/utils/tbclient'
import { getTBToken } from '@/utils/auth'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.list = [['2022-08-08', 'test', 'A', 'A', 9]]
      this.listLoading = false
    }
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
