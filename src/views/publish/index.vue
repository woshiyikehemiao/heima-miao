<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form :model="formData" :rules="formrules" ref="formpublish" class="form" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input class="title" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor class="content" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" class="coverimg"  prop="cover">
        <el-radio-group v-model="formData.cover.type" @change="changeradio">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
      <cover-images @coverimg="changeimg" :imgs="formData.cover.images"></cover-images>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value.type > 0 && value.images.every(item => item)) {
        callBack()
      } else if (value.type <= 0) {
        callBack()
      } else {
        callBack(new Error('对不起,您未设置完整的封面'))
      }
    }
    return {
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      formrules: {
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }],
        cover: [{ validator }]
      },
      list: []
    }
  },
  methods: {
    changeimg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, ind) => {
        if (ind === index) {
          return url
        } else {
          return item
        }
      })
    },
    changeradio () {
      let images
      switch (this.formData.cover.type) {
        case 0:
        case -1:
          images = []
          break
        case 1:
          images = ['']
          break
        case 3:
          images = ['', '', '']
          break
      }
      this.formData.cover.images = images
    },
    getdefaultsinfo (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        console.log(res)
        this.formData = res.data
      })
    },
    publish (draft) {
      let articleId = this.$route.params.articleId
      let method = articleId ? 'put' : 'post'
      let url = articleId ? `/articles/${articleId}` : '/articles'
      this.$refs.formpublish.validate(isOk => {
        if (isOk) {
          this.$axios({
            url,
            method,
            params: {
              draft
            },
            data: this.formData
          }).then(res => {
            // console.log(res)
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.list = res.data.channels
      })
    }
  },
  created () {
    this.getChannel()
    let articleId = this.$route.params.articleId
    if (articleId) {
      this.getdefaultsinfo(articleId)
    }
  }
}
</script>

<style lang="less" scoped>
.form{
  margin-left:100px;
  .title{
    width: 400px;
  }
  .content{
    height: 400px;
    width: 800px;
  }
  .coverimg{
    margin-top: 120px;
  }
}
</style>
