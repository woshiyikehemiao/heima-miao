<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
      <div class="imglist">
        <el-card v-for="item in formData" :key="item.id" class="card">
          <img @click="uploadimg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change="changepage"
          :current-page="page.page"
          :page-size="page.size"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="avatar-uploader" action :http-request="uploadCustom" :show-file-list="false">
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      formData: [],
      activeName: 'all',
      page: {
        page: 1,
        size: 8,
        total: 0
      }
    }
  },
  methods: {
    uploadCustom (params) {
    //   console.log(params)
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: formData
      }).then(res => {
        // this.uploading(res.data.url)
        this.$emit('selectimg', res.data.url)
      })
    },
    uploadimg (url) {
      this.$emit('selectimg', url)
    },
    changepage (newpage) {
      this.page.page = newpage
      this.getphoto()
    },
    getphoto () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.size
        }
      }).then(res => {
        this.formData = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getphoto()
  }
}
</script>

<style lang="less" scoped>
.imglist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .card {
    width: 150px;
    height: 130px;
    margin: 10px 0;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
