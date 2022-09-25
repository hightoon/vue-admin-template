<template>
  <div class="app-container">
    <el-descriptions :inline="true" title="设备详情">
      <el-descriptions-item v-for="attribute in descLabels" :key="attribute" :label="attribute">
        {{ data[attribute][0].value === undefined ? 'NA' : data[attribute][0].value }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { getLatestTsValue, refresh } from '@/utils/tbclient'
import { getTBRefreshToken, getTBToken, setTBRefreshToken, setTBToken } from '@/utils/auth'

const fullTableThread = ['设备序号', '设备序列号', '硬件版本号', '软件版本号', '总计运行时间(时)', '总计上电时间(时)',
  '总计运行次数', '总计故障次数', '操作模式', '运行模式', '喘振模式', '系统状态', '故障代码', '警告代码', '当前设定值',
  '排放压力', '过滤阻力', '入口流量', '入口温度', '出口温度', '电机温度', '变频器温度', '电机实际转速', '变频器母线电压',
  '电机电流', '电机功率', '电网电流', '电网功率', '喘振保护值', '累计用电量']

export default {
  data() {
    return {
      size: '',
      descLabels: fullTableThread,
      data: null,
      list: null,
      listLoading: true
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      console.log('fetching...' + this.$route.params.id)
      getLatestTsValue(getTBToken(), 'DEVICE', this.$route.params.id, fullTableThread.join(',')
      ).then(r => {
        console.log(r.data)
        this.data = r.data
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
    }
  }
}
</script>

