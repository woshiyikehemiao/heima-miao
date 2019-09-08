<template>
  <el-container>
    <el-aside :style="{width:isCollapse?'60px':'200px'}">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  created () {
    eventBus.$on('changeCollapse', item => {
      this.isCollapse = item
    })
  },
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  padding: 0;
}
</style>
