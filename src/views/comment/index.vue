<template>
<el-card>
    <bread-crumb slot="header">
    <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="600">
      </el-table-column>
      <el-table-column
      align="center"
      :formatter="formatter"
        prop="comment_status"
        label="评论状态">
      </el-table-column>
      <el-table-column
          align="center"
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
      align="center"
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
      align="center"
        label="操作"
        width="150">
        <template slot-scope="obj">
        <el-button type="text" size="mini">修改评论</el-button>
        <el-button type="text" size="mini">
            {{obj.row.comment_status?'关闭评论':'打开评论'}}
        </el-button>
        </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getData () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>

</style>
