<template>
<el-card class="card">
  <bread-crumb slot="header">
  <template slot="title">
    素材管理
  </template>
  </bread-crumb>
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name="all" class="tab">
      <!-- 获取参数便利生成图片 -->
      <el-card v-for="item in list" :key='item.id' class="box">
        <img :src="item.url" alt="">
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="collect">
      <!-- 获取参数便利生成图片 -->

    </el-tab-pane>
  </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    getMeterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMeterial()
  }
}
</script>

<style lang="less" scoped>
.card{
  .tab{
    display: flex;
    flex-wrap: wrap;
    .box{
      // flex: 20%;
      width:200px;
      height: 200px;
      margin: 0 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>
