<template>
  <el-card class="card">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="form">
      <el-form-item label="文章状态：">
        <el-radio-group v-model="searchForm.status" @change='changecondition'>
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- {{searchForm}} -->
      <el-form-item label="频道列表：">
        <el-select v-model="searchForm.channel_id" @change='changecondition'>
          <el-option v-for="item in channelList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
        @change='changecondition'
        value-format="yyyy-MM-dd"
          v-model="searchForm.articleDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="article-number">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-list">
      <div class="row" v-for="item in articleList" :key='item.id.toString()'>
          <div class="left">
              <img :src="item.cover.images[0]?item.cover.images[0]:srcImg" alt="">
              <div class="content">
                  <span class="title">{{item.title}}</span>
                  <el-tag class="status" :type="item.status|statusstyle">{{item.status|statustitle}}</el-tag>
                  <span class="time">{{item.pubdate}}</span>
              </div>
          </div>
          <div class="right">
              <span @click="changearticle(item.id)"><i class="el-icon-edit"></i>修改</span>
              <span @click="deletecontent(item.id)"><i class="el-icon-delete"></i>删除</span>
          </div>
      </div>
    </div>
    <el-row type="flex" justify="center">
      <el-pagination
      @current-change='currentchange'
      :current-page="page.page"
      :page-size="page.size"
      :total="page.total">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5,
        channel_id: null,
        articleDate: []
      },
      channelList: [],
      articleList: [],
      srcImg: require('../../assets/img/avatar.jpg'),
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    changearticle (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    deletecontent (id) {
      this.$confirm('您确定要删除本条内容吗', '提示').then(res => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          // console.log(res)
          this.changecondition()
        })
      })
    },
    currentchange (newpage) {
      this.page.page = newpage
      this.change()
    },
    changecondition () {
      this.page.page = 1
      this.change()
    },
    change () {
      let params = {
        channel_id: this.searchForm.channel_id,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        begin_pubdate: this.searchForm.articleDate.length > 0 ? this.searchForm.articleDate[0] : null,
        end_pubdate: this.searchForm.articleDate.length > 1 ? this.searchForm.articleDate[1] : null,
        page: this.page.page,
        per_page: this.page.size
      }
      this.getArticles(params)
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channelList = res.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        console.log(res)
        this.articleList = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    // this.getArticles()
    this.changecondition()
    this.getChannels()
  },
  filters: {
    statustitle (val) {
      switch (val) {
        case 0:
          return '草稿'
        case 1:
          return '未发表'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    statusstyle (val) {
      switch (val) {
        case 0:
          return ''
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'warning'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card{
    .form{
        margin-left: 40px;
    }
    .article-number{
        border-bottom: 1px dashed #ccc;
        padding-bottom: 10px;
        color: #323745;
        font-size: 14px;
    }
    .article-list{
        .row{
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            .left{
                display: flex;
                img{
                    width: 180px;
                    height: 100px;
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-left: 10px;
                    font-size: 14px;
                    color: #333;
                    .status{
                      text-align: center;
                      width: 70px;
                    }
                    .time{
                        color:#999;
                        font-size: 12px;
                    }
                }
            }
            .right{
                span{
                    margin-left: 8px;
                    color: #333;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
