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
      <el-table-column align="center" label="上线时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.created }}
        </template>
      </el-table-column>
      <el-table-column label="最后在线时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.lastActivityTime }}
        </template>
      </el-table-column>
      <el-table-column label="终端客户" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序列号" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="设备型号" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.deviceType }}
        </template>
      </el-table-column>
      <el-table-column label="设备状态" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.provisionState }}
        </template>
      </el-table-column>
      <el-table-column label="出厂日期" width="120" align="center">
        <template slot-scope="scope">
          {{ '0000-00-00' }}
        </template>
      </el-table-column>
      <el-table-column label="网关编号" width="120" align="center">
        <template slot-scope="scope">
          {{ '12345678' }}
        </template>
      </el-table-column>
      <el-table-column label="硬件版本" width="120" align="center">
        <template slot-scope="scope">
          {{ '1.0.0' }}
        </template>
      </el-table-column>
      <el-table-column label="软件版本" width="120" align="center">
        <template slot-scope="scope">
          {{ '1.0.1' }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="360" align="center">
        <!--template slot-scope="scope"-->
        <div class="tag-group">
          <el-tag>详情</el-tag> &nbsp;
          <el-tag>编辑</el-tag> &nbsp;
          <el-tag>实时监控</el-tag> &nbsp;
          <el-tag>配置网关</el-tag> &nbsp;
          <el-tag type="warning">离线分析</el-tag> &nbsp;
        </div>
          <!--el-tag :type="scope.row[4] | statusFilter">{{ scope.row[4] }}</el-tag-->
        <!--/template-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices, refresh, getDeviceInfo } from '@/utils/tbclient'
import { getTBRefreshToken, getTBToken, setTBRefreshToken, setTBToken } from '@/utils/auth'
import { formatTime } from '@/utils'

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
      const items = []

      getDeviceInfo(getTBToken()).then(response => {
        console.log(response.data)
        const devices = response.data
        devices.data.forEach(function(item) {
          const curItem = {}
          curItem.id = item.id.id
          curItem.customerTitle = item.customerTitle
          curItem.created = formatTime(item.createdTime)
          curItem.deviceType = item.deviceData.configuration.type
          items.push(curItem)
        })
        // this.list = items
        // this.listLoading = false
        return getDevices(getTBToken())
      }).then(response => {
        const deviceInfo = response.data.data
        const deviceInfoMap = {}
        deviceInfo.forEach((d) => {
          deviceInfoMap[d.entityId.id] = d.latest.ATTRIBUTE
        })
        items.forEach((item) => {
          item.isActive = deviceInfoMap[item.id].active.value
          item.state = '离线'
          if (item.isActive === 'true') item.state = '在线'
          item.provisionState = '未启用'
          if (deviceInfoMap[item.id].provisionState.value === 'provisioned') item.provisionState = '启用'
          item.lastActivityTime = formatTime(deviceInfoMap[item.id].lastActivityTime.value)
        })
        console.log(items)
        this.list = items
        this.listLoading = false
      }).catch(e => {
        console.log(e)
        refresh(getTBToken(), getTBRefreshToken()).then(r => {
          setTBToken(r.data.token)
          setTBRefreshToken(r.data.refreshToken)
          location.reload()
        })
      })
      /* getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      }) */
    }
  }
}
</script>
