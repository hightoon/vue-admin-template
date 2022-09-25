<template>
  <div class="app-container">

    <div class="block">
      <!--span class="demonstration">Default</span-->
      <el-date-picker
        v-model="interval"
        type="datetimerange"
        range-separator="到"
        start-placeholder="Start date"
        end-placeholder="End date"
      /> &nbsp;
      <el-button type="primary" @click="notif">查询</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column v-for="attribute in tableThread" :key="attribute" :label="attribute" width="100">
        <!--template slot-scope="scope">
          {{ scope.row[attribute] === undefined || scope.row[attribute][0] === undefined ? 'NA' : scope.row[attribute][0].value }}
        </template-->
        <template slot-scope="scope">
          {{ scope.row[attribute] === undefined ? 'NA' : scope.row[attribute] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices, getTimeSeries, getDeviceInfo, getLatestTsValue,
  getTsValuesInterval, getFanDevs, refresh } from '@/utils/tbclient'
import { getTBToken, setTBToken, getTBRefreshToken, setTBRefreshToken } from '@/utils/auth'

const start = new Date()
const end = new Date()
start.setTime(start.getTime() - 3600 * 1000 * 100)
const defaultInterval = [
  start, // new Date(2022, 10, 10, 10, 10)
  end
]

const fullTableThread = ['设备序号', '设备序列号', '硬件版本号', '软件版本号', '总计运行时间(时)', '总计上电时间(时)',
  '总计运行次数', '总计故障次数', '操作模式', '运行模式', '喘振模式', '系统状态', '故障代码', '警告代码', '当前设定值',
  '排放压力', '过滤阻力', '入口流量', '入口温度', '出口温度', '电机温度', '变频器温度', '电机实际转速', '变频器母线电压',
  '电机电流', '电机功率', '电网电流', '电网功率', '喘振保护值', '累计用电量']

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
      tableThread: fullTableThread,
      interval: defaultInterval
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.list = []
      // console.log(this.interval)
      // console.log(this.interval[0].getTime(), this.interval[1].getTime(), getTBToken())
      getFanDevs(getTBToken()).then(r => {
        console.log(r.data.data)
        const deviceIds = []
        r.data.data.forEach(d => {
          deviceIds.push(d.entityId.id)
        })
        console.log(deviceIds)
        return Promise.all(deviceIds)
      }).then(devices => {
        const myList = []
        devices.forEach(d => {
          getTsValuesInterval(getTBToken(), 'DEVICE', d, fullTableThread.join(','), this.interval[0].getTime(), this.interval[1].getTime()).then(r => {
            console.log(r)
            if (r.data['硬件版本号']) {
              for (let i = 0; i < r.data['硬件版本号'].length; i++) {
                const row = {}
                fullTableThread.forEach(k => {
                  if (r.data[k] && r.data[k][i]) {
                    row[k] = r.data[k][i].value
                  } else {
                    row[k] = 'NA'
                  }
                })
                myList.push(row)
              }
            }
          })
        })
        this.list = myList
        this.listLoading = false
      }).catch(e => {
        console.log(e)
        if (e.response) {
          if (e.response.status === 401) {
            refresh(getTBToken(), getTBRefreshToken()).then(r => {
              setTBToken(r.data.token)
              setTBRefreshToken(r.data.refreshToken)
              location.reload()
            })
          }
        }
      })
    },

    notif() {
      console.log(this.interval)
      this.fetchData()
    }
  }
}
</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
