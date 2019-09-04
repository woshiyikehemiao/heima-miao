<template>
  <el-card class="card">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="form">
      <el-form-item label="文章状态：">
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">草稿</el-radio>
          <el-radio :label="3">待审核</el-radio>
          <el-radio :label="4">审核通过</el-radio>
          <el-radio :label="5">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select v-model="articleSelect">
          <el-option value="1" label="a" v-for="(item,index) in list" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
          v-model="articleDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 1,
      articleSelect: '',
      articleDate: '',
      list: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style lang="less" scoped>
.card{
    .form{
        margin-left: 40px;
    }
}
</style>
