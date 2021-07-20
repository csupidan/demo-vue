<template>
  <div class="app-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          style="width: 300px; margin-left:10px;"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          show-password
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          style="width: 300px; margin-left:10px;"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:300px; margin-left:25px; margin-bottom:20px;" @click.native.prevent="handleLogin">
        登录授权API
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { postuser } from '@/api/apitest'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      //
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      postuser(this.loginForm)
        .then(response => {
          this.loading = false
          this.$message.success('授权成功')
        })
        .catch(error => {
          this.loading = false
          this.answer = '网络出问题了：' + error
        })
    }
  }
}
</script>
