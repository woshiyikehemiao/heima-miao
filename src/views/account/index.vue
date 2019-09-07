<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            账户信息
        </template>
      </bread-crumb>
      <el-upload class="upload" action :http-request="uploadHeadImg" :show-file-list="false">
          <img :src="formdata.photo||defaultImg" alt="">
      </el-upload>
      <el-form class="form" label-width="100px" :model="formdata" :rules="userrules" ref="formdata">
          <el-form-item label="用户名" prop="name">
              <el-input class="input" v-model="formdata.name"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input class="input" v-model="formdata.intro"></el-input>
        </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input class="input" v-model="formdata.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input class="input" v-model="formdata.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click="saveuserinfo" type="primary">
                  保存
              </el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  data () {
    return {
      formdata: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      userrules: {
        name: [{ required: true, message: '用户名不能为空' }, { max: 7, min: 1, mesage: '用户名长度为2-10' }],
        intro: [{ required: true, message: '简介不能为空' }],
        email: [{ pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/, message: '邮箱格式不正确' }]
      },
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    uploadHeadImg (params) {
      let formdata = new FormData()
      formdata.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: formdata
      }).then(res => {
        this.formdata.photo = res.data.photo
        eventBus.$emit('changeuserinfo')
      })
    },
    getdata () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formdata = res.data
      })
    },
    saveuserinfo () {
      this.$refs.formdata.validate(isOk => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formdata
        }).then(res => {
          this.$message({
            type: 'success',
            message: '用户数据保存成功'
          })
          eventBus.$emit('changeuserinfo')
        })
      })
    }
  },
  created () {
    this.getdata()
  }
}
</script>

<style lang="less" scoped>
.form{
    .input{
        width: 400px;
    }
}
.upload{
    position: absolute;
    top: 130px;
    left: 800px;
    img{
        width: 200px;
        height: 200px;
        border-radius: 50%
    }
}
</style>
