<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getDevices, refresh } from '@/utils/tbclient'
import { getTBRefreshToken, getTBToken, setTBRefreshToken, setTBToken } from '@/utils/auth'
import { get } from 'js-cookie'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      numOfDevice: 0
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      const deviceOverall = [0, 0, 0]
      getDevices(getTBToken()).then((response) => {
        const deviceInfo = response.data.data
        deviceInfo.forEach(item => {
          if (item.latest.ATTRIBUTE.active.value === 'true') {
            deviceOverall[0]++
          } else {
            deviceOverall[1]++
          }
        })
        this.numOfDevice = deviceOverall.reduce((a, b) => a + b, 0)
        this.chart.setOption({
          title: {
            text: '设备总数: ' + this.numOfDevice,
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          /*legend: {
            left: 'center',
            bottom: '10',
            data: ['故障', '在线', '离线']
          },*/
          calculable: true,
          series: [
            {
              name: '设备状态',
              type: 'pie',
              data: [
                { value: deviceOverall[2], name: '故障' },
                { value: deviceOverall[0], name: '在线' },
                { value: deviceOverall[1], name: '离线' }
              ]
            }
          ]
        })
      }).catch(err => {
        console.log(err)
        refresh(getTBToken(), getTBRefreshToken()).then(r => {
          setTBToken(r.data.token)
          setTBRefreshToken(r.data.refreshToken)
          location.reload()
        })
      })
    }
  }
}
</script>
