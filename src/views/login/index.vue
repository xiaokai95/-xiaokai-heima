<template>
  <div class="cantainer">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.name" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:280px;margin-right:18px"
          ></el-input>
          <el-button>获取验证码</el-button>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: '',
        code: ''
      }
    }
  }
}
</script>

<style lang='less'>
.cantainer {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 450px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
}
</style>
