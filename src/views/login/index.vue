<template>
  <div class="login">
      <el-card class="login-card">
          <div class="logo">
          <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form :model="loginform" :rules="loginrules" ref="loginform">
              <el-form-item prop="mobile">
               <el-input placeholder="请输入手机号" v-model="loginform.mobile"></el-input>
              </el-form-item>
              <el-form-item prop="code">
               <el-input placeholder="请输入验证码" class="inp2" v-model="loginform.code"></el-input>
                  <el-button class="btn1">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="loginform.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" class="btn2" @click='login'>登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack()
      } else {
        callBack(new Error('您必须同意协议'))
      }
    }
    return {
      loginform: {
        mobile: '',
        code: '',
        check: false
      },
      loginrules: {
        mobile: [{ required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号为十一位数字' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /\d{6}/, message: '验证码为六位数字' }],
        check: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginform.validate(isOk => {
        if (isOk) {
          console.log(123)
        } else {
          this.loginform.mobile = ''
          this.loginform.code = ''
        }
      })
    }
  }
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
