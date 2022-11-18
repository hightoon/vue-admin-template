<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="center">
      <el-form :inline="true" justify="center" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input placeholder="" v-model="devname"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select placeholder="">
            <el-option label="设备" value="device"></el-option>
            <el-option label="网关" value="gateway"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="plain" @click="search('hello')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
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
      <el-table-column align="center" label="设备名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
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
          {{ scope.row.hardVer }}
        </template>
      </el-table-column>
      <el-table-column label="软件版本" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.softVer }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
        <div class="tag-group">
          <el-button size="small" type="text" @click="showDeviceDetails(scope.row.id)">详情</el-button>
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">实时监控</el-button>
          <el-button size="small" type="text">配置网关</el-button>
          <el-button size="small" type="warning" plain>离线分析</el-button>
        </div>
          <!--el-tag :type="scope.row[4] | statusFilter">{{ scope.row[4] }}</el-tag-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices, refresh, getDeviceInfo,
  device, getTimeSeries, getLatestTsValue, getUri } from '@/utils/tbclient'
import { getTBRefreshToken, getTBToken, setTBRefreshToken, setTBToken, setToken } from '@/utils/auth'
import { formatTime } from '@/utils'
import { tsAnyKeyword } from '@babel/types'

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
      devname: 'FAN'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const items = []
      const deviceInfoMap = {}

      getDeviceInfo(getTBToken(), this.devname).then(response => {
        console.log(response.data)
        const devices = response.data
        // console.log(devices)
        devices.data.forEach(function(item) {
          const curItem = {}
          curItem.name = item.name
          curItem.id = item.id.id
          curItem.customerTitle = item.customerTitle
          curItem.created = formatTime(item.createdTime)
          curItem.deviceType = item.deviceData.configuration.type
          items.push(curItem)
          getTimeSeries(getTBToken(), 'DEVICE', curItem.id).then(r => {
            console.log(r)
          })
        })
        // this.list = items
        // this.listLoading = false
        return getDevices(getTBToken())
      }).then(response => {
        const deviceInfo = response.data.data
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
        var tsValReqs = []
        items.forEach(it => {
          if (it.name.includes('FAN')) {
            tsValReqs.push(it.id)
            tsValReqs.push(getLatestTsValue(getTBToken(), 'DEVICE', it.id, 'soft_version,hard_version,device_node_id'))
          }
        })
        return Promise.all(tsValReqs)
      }).then(values => {
        for (let i = 0; i < values.length; i += 2) {
          console.log(values[i])
          console.log(values[i+1])
          deviceInfoMap[values[i]].softVer = values[i+1].data.soft_version[0].value
          deviceInfoMap[values[i]].hardVer = values[i+1].data.hard_version[0].value
        }
        items.forEach(item => {
          item.softVer = deviceInfoMap[item.id].softVer
          item.hardVer = deviceInfoMap[item.id].hardVer
        })
        this.list = items
        this.listLoading = false
      }).catch(e => {
        console.log(e)
        if (e.response) {
          if (e.response.status === 401) {
            refresh(getTBToken(), getTBRefreshToken()).then(r => {
              setToken(r.data.token)
              setTBToken(r.data.token)
              setTBRefreshToken(r.data.refreshToken)
              location.reload()
            })
          }
        }
      })
      /* getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      }) */
    },

    showDeviceDetails(id) {
      window.location.href = '/#/detail/' + id
      // this.$router.push('/#/detail/' + id)
    },

    search() {
      this.fetchData()
    }
  }
}
</script>
