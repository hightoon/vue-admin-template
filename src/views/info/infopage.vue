<template>
  <div class="app-container">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="常见问题及解决办法">常见问题及解决办法</el-tab-pane>
      <el-tab-pane label="产品功能及版本信息">产品功能及版本信息</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
