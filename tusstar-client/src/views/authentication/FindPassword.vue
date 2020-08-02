<template>
  <div class="container">
    <back-home></back-home>
    <div class="login">
      <h1>找回密码</h1>
      <p style="margin-bottom: 30px;color: #888;font-size: 16px">请输入您的邮箱地址，我们会向您发送一封重置密码的电子邮件。</p>
      <Form ref="emailForm"
            :model="info"
            label-position="top"
            :rules="ruleValidate">
        <FormItem label="学号/公司名称" prop="username">
            <Input type="text" v-model="info.username" />
        </FormItem>
        <FormItem>
          <RadioGroup v-model="info.type">
            <Radio label="0" style="margin-right: 30px;">
              <Icon type="ios-contact" />学生</Radio>
            <Radio label="1">
              <Icon type="md-contacts" />企业</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="邮箱地址" prop="email">
            <Input type="email" v-model="info.email" />
        </FormItem>
        <FormItem label="新密码" prop="password">
            <Input type="password" v-model="info.password" />
        </FormItem>
        <FormItem label="重复密码" prop="confirmPassword">
            <Input type="password" v-model="info.confirmPassword" />
        </FormItem>
        <FormItem>
            <Button type="info" long @click="sendMail">发送邮件</Button>
        </FormItem>
        <FormItem label="请输入验证码" prop="code">
            <Input type="text" v-model="info.code"/>
        </FormItem>
        <FormItem>
            <Button type="primary" long @click="handleSubmit('emailForm')">找回密码</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import BackHome from '@/components/common/BackHome'
import axios from 'axios'
export default {
  components: {
    BackHome
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不小于6位'));
      } else if (value.length > 16) {
        callback(new Error('密码长度不大于16位'));
      } else {
        if (this.info.confirmPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.emailForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'));
      } else if (value !== this.info.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      info: {
        username: '',
        email: '',
        type: '0',
        code: '',
        password: '',
        confirmPassword: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名字不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async sendMail(){
      if (this.info.email === '') {
        this.$Message.error('请填写邮箱');
        return;
      }
      const { data: res } = await axios.get('/users/sentEmailCode', {
        params: {
          email: this.info.email
        }
      })
      if (res.code === 1) {
        this.$Message.success('发送成功');
      } else {
        this.$Message.error(res.msg);
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let url = '';
          if (this.info.type === '0') { // 学生
            url = '/student/findPassword';
          } else { // 企业
            url = '/company/findPassword'
          }
          const { data: res } = await axios.post(url, {
            password: this.info.password,
            username: this.info.username,
            code: this.info.code,
            email: this.info.email
          })
          if (res.code === 1) {
            this.$Message.success('修改成功');
            this.$router.history.push('/login');
          } else {
            this.$Message.error(res.msg);
          }
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/login/login.less";
  .login {
    max-width: 400px;
  }
</style>
