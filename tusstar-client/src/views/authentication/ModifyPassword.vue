<template>
  <div class="container">
    <back-home></back-home>
    <div class="login">
      <h1>密码修改</h1>
      <Form ref="passwordForm"
            :model="passwordInfo"
            :rules="ruleValidate"
            label-position="top">
        <FormItem label="旧密码"
                  prop="oldPassword">
          <Input type="password"
                 v-model="passwordInfo.oldPassword" />
        </FormItem>
        <FormItem label="新密码"
              prop="password">
           <Input type="password"
                 v-model="passwordInfo.password" />
        </FormItem>
        <FormItem label="重复新密码"
                  prop="confirmPassword">
          <Input type="password"
                 v-model="passwordInfo.confirmPassword" />
        </FormItem>
        <FormItem label="验证邮箱"
                  prop="email">
          <Input type="email"
                 v-model="passwordInfo.email" />
        </FormItem>
        <FormItem>
          <i-button style="background-color:#5cadff;color:white"
                  @click="sendmail">发送验证码</i-button>
        </FormItem>
        <FormItem label="请输入验证码"
                  prop="code">
          <Input type="text"
                 v-model="passwordInfo.code" />
        </FormItem>
        <FormItem>
          <Button type="primary"
                  long
                  @click="handleSubmit('passwordForm')">确定修改</Button>
        </FormItem>
        <div style="text-align: center">
          <router-link :to="returnurl">返回</router-link>
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
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不小于6位'));
      } else if (value.length > 16) {
        callback(new Error('密码长度不大于16位'));
      } else {
        if (this.passwordInfo.confirmPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.passwordForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'));
      } else if (value !== this.passwordInfo.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      passwordInfo: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
        email: '',
        code: ''
      },
      returnurl: '',
      ruleValidate: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        validateCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    if (this.$store.state.user.type === 0) {
      this.returnurl = '/personal-center'
    } else {
      this.returnurl = '/company-center'
    }
  },
  methods: {
    async sendmail() {
      if (this.passwordInfo.email === ''){
        this.$Message.error('请输入正确的邮箱');
      } else {
        const { data: res } = await axios.get('/users/sentEmailCode', {
          params: {
            email: this.passwordInfo.email
          }
        });
        if (res.code === 0){
          this.$Message.success('发送失败');
        } else {
          this.$Message.success('发送成功');
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let url;
          if (this.$store.state.user.type === 0) {
            url = '/student/changePassword';
          } else {
            url = '/company/changePassword';
          }
          const {
            data: response
          } = await axios.post(url, {
            passwordInfo: this.passwordInfo
          });
          if (response.code === 1){
            this.$Message.success('密码修改成功');
            setTimeout(() => {
              // this.$router.history.push('/company-center')
              this.$router.go(-1)
            }, 1000)
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
  .login{
    max-width: 500px;
  }
</style>
