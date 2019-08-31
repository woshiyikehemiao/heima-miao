<template>
  <div class="login">
      <el-card class="login-card">
          <div class="logo">
          <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form>
              <el-form-item>
               <el-input placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
               <el-input placeholder="请输入验证码" class="inp2"></el-input>
                  <el-button class="btn1">发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" class="btn2">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login{
    background-image: url("../../assets/img/login_bg.jpg");
    height: 100vh;
    background-size: cover;
    position: relative;
    .login-card{
        width: 450px;
        height: 350px;
        position: absolute;
        left: 50%;
        top:50%;
        transform:translate(-50%,-50%);
        .logo{
            text-align: center;
            margin-bottom: 15px;
                img{
                    height: 45px;
                }
        }
        .inp2{
            width: 70%;
        }
        .btn1{
            float: right;
        }
        .btn2{
            width: 100%;
        }
    }
}
</style>
