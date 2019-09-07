<template>
<el-row class="row" type="flex" justify="space-between">
  <el-col :span='7' class="col1">
    <i class="el-icon-s-unfold"></i>
    <span>
      江苏传智播客教育科技股份有限公司
    </span>
  </el-col>
  <el-col :span='4' class="col2">
    <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
    <el-dropdown class="drop" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link" >
        {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="info">个人信息</el-dropdown-item>
    <el-dropdown-item command="git">git地址</el-dropdown-item>
    <el-dropdown-item command="quit">退出</el-dropdown-item>
  </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getData () {
      // let token = window.localStorage.getItem('user-token')
      // console.log(token)
      this.$axios({
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // },
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.userInfo = res.data
      })
      // .catch(err => {
      //   console.log(err)
      //   this.$message({
      //     type: 'warning',
      //     message: '获取信息失败'
      //   })
      // })
    },
    handleCommand (command) {
      if (command === 'info') {
        console.log('个人信息')
      } else if (command === 'git') {
        this.$router.push('https://github.com/woshiyikehemiao/heima-miao')
      } else {
        window.localStorage.clear()// 清除缓存
        this.$router.push('/login')// 返回登陆页
      }
    }
  },
  created () {
    this.getData()
    eventBus.$on('changeuserinfo', () => {
      this.getData()
    })
  }
}
</script>

<style lang='less' scoped>
.row{
margin: 0;
padding: 0;
height: 40px;
padding-top: 20px;
.col1{
  i{
    font-size: 20px;
  }
}
.col2{
  img{
    border-radius: 50%;
    height:40px;
    width: 40px;
    margin-right: 5px;
  }
  .drop{
    top: -14px;
  }
}
}
</style>
