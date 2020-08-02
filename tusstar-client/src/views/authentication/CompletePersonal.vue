<template>
  <div class="container">
    <div class="login">
      <h1>个人信息完善</h1>
      <Form ref="passwordForm"
            :model="passwordInfo"
            :rules="ruleValidate"
            label-position="top"
            hide-required-mark >
        <FormItem label="请输入新密码" prop="password">
          <Input type="password" v-model="passwordInfo.password" password />
        </FormItem>
        <FormItem label="请确认新密码" prop="confirmPassword">
          <Input type="password" v-model="passwordInfo.confirmPassword" password />
        </FormItem>
        <FormItem label="手机电话" prop="phone">
                <Input type="tel" v-model="passwordInfo.phone" />
              </FormItem>
        <FormItem label="电子邮箱" prop="email">
                <Input type="email" v-model="passwordInfo.email" />
              </FormItem>
        <FormItem>
          <Button
           long
           @click="sendmail">发送邮件</Button>
        </FormItem>
        <FormItem label="邮箱验证码" prop="validateCode">
          <Input type="text" v-model="passwordInfo.validateCode" />
        </FormItem>
        <FormItem>
          <Button type="primary"
                  long
                  @click="handleSubmit('passwordForm')">确认修改</Button>
        </FormItem>
        <!-- <div style="text-align: center">
          <router-link to="/personal-center">返回</router-link>
        </div> -->
      </Form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
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
        password: '',
        confirmPassword: '',
        phone: '',
        email: '',
        validateCode: ''
      },
      ruleValidate: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号不合法', trigger: 'blur' }
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
  methods: {
    async sendmail() {
      if (this.passwordInfo.email === ''){
        alert('请先输入正确的邮箱');
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
          const {
            data: res
          } = await axios.post('/student/setStudentInfo', {
            password: this.passwordInfo.password,
            confirmPassword: this.passwordInfo.confirmPassword,
            phone: this.passwordInfo.phone,
            email: this.passwordInfo.email,
            code: this.passwordInfo.validateCode
          });
          if (res.code === 1){
            this.$Message.success('完善个人信息修改成功');
            setTimeout(() => {
              this.$router.history.push('/')
            }, 1000)
          } else {
            this.$Message.error(res.msg);
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
