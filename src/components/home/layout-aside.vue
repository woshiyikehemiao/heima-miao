<template>
<el-menu
      class="menu"
      background-color="#323745"
      text-color="#adafb5"
      active-text-color="#ffd04b">
      <div class="logo">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu-item index="0">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-submenu index="1">
          <template slot="title">
             <i class="el-icon-s-order"></i>
             <span>内容管理</span>
             </template>
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论管理</el-menu-item>
          <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>
         <el-submenu index="2">
          <template slot="title">
             <i class="el-icon-s-custom"></i>
             <span>粉丝管理</span>
          </template>
          <el-menu-item index="2-1">图文数据</el-menu-item>
          <el-menu-item index="2-2">粉丝概况</el-menu-item>
          <el-menu-item index="2-3">粉丝列表</el-menu-item>
          <el-menu-item index="2-4">粉丝画像</el-menu-item>
        </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.menu{
  width: 200px;
  height: 100vh;
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
