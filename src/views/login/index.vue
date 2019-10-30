<template>
  <div class="cantainer">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            maxlength="6"
            style="width:280px;margin-right:18px"
          ></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top:20px" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    const validatorName = (rule, value, callback) => {
      if (/^1[3-9]\d{9}/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: validatorName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$http
            .post('authorizations', this.loginForm)
            .then(res => {
              local.setUser(res.data.data)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
    // async 和await
    // login () {
    //   // 对整个表单进行校验
    //   this.$refs['loginForm'].validate(async valid => {
    //     if (valid) {
    //       // 以下代码可能出现异常（报错）  使用try{ 可能报错代码 }catch(e){ 处理错误 }
    //       try {
    //         const {
    //           data: { data }
    //         } = await this.$http.post('authorizations', this.LoginForm)
    //         local.setUser(data)
    //         this.$router.push('/')
    //       } catch (e) {
    //         this.$message.error('手机号或验证码错误')
    //       }
    //     }
    //   })
    // }
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
