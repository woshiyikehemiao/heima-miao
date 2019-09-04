<template>
  <el-card class="card">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
        <el-upload class="upload" action="" :show-file-list="false" :http-request='uploadImg'>
          <el-button>
            上传图片
          </el-button>
        </el-upload>
    <el-tabs v-model="activeName" @tab-click="changtab">
      <el-tab-pane label="全部素材" name="all" class="tab">
        <!-- 获取参数便利生成图片 -->
        <el-card v-for="item in list" :key="item.id" class="box">
          <img :src="item.url" alt />
          <el-row class="icon" type="flex" justify="space-around">
            <i @click='changeStatus(item)' :style="{color:item.is_collected?'red':''}" class="el-icon-star-on i1"></i>
            <i @click='deleteImg(item.id)' class="el-icon-delete i2"></i>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect" class="tab">
        <!-- 获取参数便利生成图片 -->
        <el-card v-for="item in list" :key="item.id" class="box">
          <img :src="item.url" alt />
        </el-card>
      </el-tab-pane>
          <el-row class="page" type="flex" justify="center">
      <el-pagination background :page-size="page.size" :current-page="page.page" :total="page.total" @current-change='changepage'></el-pagination>
    </el-row>
    </el-tabs>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      console.log(params)
      let loadformdata = new FormData()
      loadformdata.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: loadformdata
      }).then(res => {
        console.log(res)
        this.getMeterial()
      })
    },
    changeStatus (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏此图片吗`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          this.getMeterial()
        })
      })
    },
    deleteImg (id) {
      this.$confirm('您确认要删除此图片吗', '提示').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(res => {
          // console.log(res)
          this.getMeterial()
        })
      })
    },
    changepage (newpage) {
      // alert(this.page.page)
      this.page.page = newpage
      this.getMeterial()
    },
    changtab () {
      this.page.page = 1
      this.getMeterial()
    },
    getMeterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // collect: false
          page: this.page.page,
          per_page: this.page.size,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMeterial()
  }
}
</script>

<style lang="less" scoped>
.card {
  .upload{
    position: absolute;
    right: 38px;
    top: 120px;
  }
  .page{
    margin-top: 15px;
  }
  .tab {
    display: flex;
    flex-wrap: wrap;
    height: 400px;
    .box {
      // flex: 20%;
      width: 200px;
      height: 200px;
      margin: 0 10px;
      position: relative;
      img {
        width: 150px;
        height: 130px;
      }
      .icon {
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        .i1 {
          font-size: 20px;
        }
        .i2 {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
