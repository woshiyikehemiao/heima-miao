<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column align="center" :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="obj">
          <el-button type="text" size="mini">修改评论</el-button>
          <el-button
            type="text"
            size="mini"
            :style="{color:obj.row.comment_status?'#E6A23C':'#67C23A'}"
            @click="changestatus(obj.row)"
          >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination :current-page="page.page" :page-size="page.size" :total="page.total" @current-change="changepage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    changepage (newpage) {
      this.page.page = newpage
      this.getData()
    },
    changestatus (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      console.log(row)
      this.$confirm(`你确认要${mess}评论吗?`).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(res => {
          this.getData()
        })
      })
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getData () {
      this.$axios({
        url: '/articles',
        params: {
          page: this.page.page,
          per_page: this.page.size,
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.page.total = res.data.total_count
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
