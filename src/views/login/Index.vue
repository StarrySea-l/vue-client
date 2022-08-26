<template>
  <div class="bg">
    <div class="login-container" @keyup.13="login">>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="userName">
          <el-input
            v-model.trim="ruleForm.userName"
            type="text"
            maxlength="30"
            learable
            auto-complete="off"
            placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model.trim="ruleForm.passWord"
            type="password"
            maxlength="20"
            learable
            auto-complete="off"
            placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="imageCode">
          <el-col :span="16">
            <el-input
              v-model.trim="ruleForm.imageCode"
              clearable
              type="text"
              maxlength="4"
              auto-complete="off"
              placeholder="图形验证码">
            </el-input>
          </el-col>
          <el-col :span="1">&nbsp; </el-col>
          <el-col :span="7" style="height: 47px;border: 1px solid #e4e0e0;border-radius: 3px;">
            <img :src="src" class="el-imgcode" @click="refreshCode">
          </el-col>
        </el-form-item>
         <el-form-item style="width:100%;">
          <el-button :loading="logining" type="primary" style="width:100%;" @click.native.prevent="login">登录</el-button>
            <div align="right">
              <el-button type="text" @click="goModifyPassword">忘记密码？</el-button>
            </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import { loginByUserName } from '@/api/login'

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateImgCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入图形验证码'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      src: '',
      ruleForm: {
        userName: '',
        passWord: '',
        imageCode: ''
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        passWord: [{ required: true, trigger: 'blur', validator: validatePassword }],
        imageCode: [{ required: true, trigger: 'blur', validator: validateImgCode }]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 获取图形验证码
    refreshCode () {
      this.src = window.BACKEND_SERVER_URL + '/getImage?t=' + new Date().getTime()
      console.log(window.BACKEND_SERVER_URL)
    },
    login () {
      this.src = window.BACKEND_SERVER_URL + '/getImage?t=' + new Date().getTime()
      var self = this
      self.$refs.ruleForm.validate(async validate => {
        if (validate) {
          self.logining = true
          try {
            var result = await loginByUserName(self.ruleForm)
            console.log(result)
            if (result.status === 'success') {
              var token = result.data.token
              window.localStorage.setItem('token', token)
              console.log(result.data.token)
              console.log('login success')
              self.$router.push({ path: this.redirect || '/Home' })
            } else {
              this.$message({
                message: result.message,
                type: 'error',
                offset: 100
              })
            }
          } catch (err) {
            self.logining = false
          }
        } else {
          return false
        }
      })
    },
    goModifyPassword () {}
  },
  created () {
    this.refreshCode()
  },
  mounted () {}
}
</script>

<style>
.bg{
  background:url("../../assets/bg1.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 200px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #000000;
  box-shadow: 0 0 25px #000000;
}
.el-input__inner {
  height: 47px;
  background-color: rgba(0, 0, 0, 0.247);
  color: rgb(255, 245, 245);
}
.el-imgcode{
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
</style>
