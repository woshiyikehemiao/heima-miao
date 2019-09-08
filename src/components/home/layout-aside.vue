<template>
<el-menu
      :type="{width:isCollapse?'60px':'200px'}"
      :collapse="isCollapse"
      :router="true"
      class="menu"
      background-color="#323745"
      text-color="#adafb5"
      active-text-color="#ffd04b">
      <div class="logo">
        <img :src="isCollapse?collapseimg:notcollapseimg" alt="">
      </div>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-submenu index="1">
          <template slot="title">
             <i class="el-icon-s-order"></i>
             <span>内容管理</span>
             </template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论管理</el-menu-item>
          <el-menu-item index="/home/meterial">素材管理</el-menu-item>
        </el-submenu>
         <el-submenu index="2">
          <template slot="title">
             <i class="el-icon-s-custom"></i>
             <span>粉丝管理</span>
          </template>
          <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
          <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          <el-menu-item index="/home/fansimg">粉丝画像</el-menu-item>
        </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      collapseimg: require('../../assets/img/toutiao.png'),
      notcollapseimg: require('../../assets/img/logo_admin.png')
    }
  },
  created () {
    eventBus.$on('changeCollapse', item => {
      this.isCollapse = item
    })
  }
}
</script>

<style lang='less' scoped>
.menu{
  min-height: 100vh;
  height: 100%;
  .logo{
    padding: 10px;
    background-color: #2e2f32;
    text-align: center;
    img{
      height: 30px;
    }
  }
}

</style>
