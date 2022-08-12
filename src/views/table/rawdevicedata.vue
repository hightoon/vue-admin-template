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
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备序列号" width="150">
        <template slot-scope="scope">
          {{ scope.row[0] }}
        </template>
      </el-table-column>
      <el-table-column label="时间" width="150">
        <template slot-scope="scope">
          {{ scope.row[1] }}
        </template>
      </el-table-column>
      <el-table-column label="设备序号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[2] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="硬件版本号" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row[3] }}
        </template>
      </el-table-column>
      <el-table-column label="总运行次数" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row[4] }}
        </template>
      </el-table-column>
      <el-table-column label="软件版本号" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row[4] }}
        </template>
      </el-table-column>
      <el-table-column label="总运行时间(小时)" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row[4] }}
        </template>
      </el-table-column>
      <el-table-column label="总上电时间(小时)" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row[4] }}
        </template>
      </el-table-column>
      <el-table-column label="总计故障次数" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row[4] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices, getTimeSeries, getDeviceInfo } from '@/utils/tbclient'
import { getTBToken } from '@/utils/auth'

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
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.list = []
      this.listLoading = false
      /* getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      }) */
    }
  }
}
</script>
