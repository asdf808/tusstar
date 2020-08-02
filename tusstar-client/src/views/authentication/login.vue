<template>
  <div class="container">
    <back-home></back-home>
    <div class="login">
      <h1>用户登录</h1>
      <Form ref="loginForm"
            :model="loginMsg"
            :rules="ruleValidate"
            label-position="top">
        <FormItem label="账号(手机号/企业名称)"
                  prop="username">
          <Input type="text"
                 v-model="loginMsg.username" />
        </FormItem>
        <FormItem label="用户类型"
              prop="listed">
          <RadioGroup v-model="loginMsg.userType">
            <Radio label="学生" style="margin-right: 30px;">学生</Radio>
            <Radio label="企业">企业</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="密码"
                  prop="password">
          <Input type="password"
                 v-model="loginMsg.password" />
        </FormItem>
        <FormItem prop="rememberMe">
          <Checkbox v-model="loginMsg.rememberMe">记住我</Checkbox>
          <router-link to="/find-password"
                       style="float: right">忘记密码？</router-link>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  long
                  @click="handleSubmit('loginForm')">登录</Button>
        </FormItem>
        <div style="text-align: center">
          <router-link to="/company-regist">企业注册</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import BackHome from '@/components/common/BackHome'
import axios from 'axios';
export default {
  components: {
    BackHome
  },
  data () {
    return {
      loginMsg: {
        username: '',
        password: '',
        userType: '学生',
        rememberMe: false
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let url;
          if (this.loginMsg.userType === '学生'){
            url = '/users/' + 'stuLogin';
          }
          if (this.loginMsg.userType === '企业'){
            url = '/users/' + 'comLogin';
          }
          const {
            data: response
          } = await axios.post(url, {
            username: this.loginMsg.username,
            password: this.loginMsg.password,
            rem: this.loginMsg.rememberMe
          });
          const data = response.data;
          if (response.code === 1) {
            this.$store.commit('user/setUser', data);
            this.$Message.success(response.msg);
            if (data.judgefirst === 1){
              setTimeout(() => {
                this.$router.history.push('/')
              }, 1000)
            } else {
              if (this.loginMsg.userType === '学生'){
                setTimeout(() => {
                  this.$router.history.push('/complete-personal');
                }, 1000)
              } else {
                setTimeout(() => {
                  this.$router.history.push('/')
                }, 1000)
              }
            }
          } else {
            this.$Message.error(response.msg);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @import "../../assets/css/login/login.less";
  .login {
    max-width: 500px;
  }
</style>
