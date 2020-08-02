<template>
  <div class="container">
    <back-home></back-home>
    <div class="regist">
      <h1>用户注册</h1>
      <Form ref="registForm"
            :model="registMsg"
            :rules="ruleValidate"
            label-position="top">
        <FormItem label="账号(手机号)"
                  prop="phone">
          <Input type="text"
                 v-model="registMsg.phone" />
        </FormItem>
        <FormItem label="电子邮箱"
                  prop="email">
          <Input type="email"
                 v-model="registMsg.email"/>
        </FormItem>
        <Row>
          <Col span="15">
            <FormItem label="用户名"
                      prop="username"
                      >
              <Input type="text"
                    v-model="registMsg.username"/>
            </FormItem>
          </Col>
          <Col span="7" offset="2">
            <FormItem label="性别"
                      prop="sex" >
              <Select v-model="registMsg.sex" style="" >
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="13">
            <FormItem label="真实姓名"
                      prop="realname">
              <Input type="text"
                    v-model="registMsg.realname" />
            </FormItem>
          </Col>
          <Col span="9" offset="2">
            <FormItem label="出生日期"
                      prop="birthday" >
              <DatePicker type="date" placeholder="Birthday" v-model="registMsg.birthday"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="密码"
                  prop="password">
          <Input type="password"
                 v-model="registMsg.password" />
        </FormItem>
        <FormItem label="确认密码"
                  prop="confirmPassword">
          <Input type="password"
                 v-model="registMsg.confirmPassword" />
        </FormItem>
        <FormItem>
          <Button type="primary"
                  long
                  @click="handleSubmit('registForm')">注册</Button>
        </FormItem>
        <div style="text-align: center">
          已有账户?
          <router-link to="/login">立即登录</router-link>
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
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === ''){
        callback(new Error('用户名不能为空'));
      }
      callback();
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不小于6'));
      } else if (value.length > 16) {
        callback(new Error('密码长度不大于16'));
      } else {
        if (this.registMsg.confirmPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.registForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'));
      } else if (value !== this.registMsg.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      registMsg: {
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        realname: '',
        birthday: '',
        sex: ''
      },
      ruleValidate: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号不合法', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          const {
            data: response
          } = await axios.post('/users/regist', {
            phone: this.registMsg.phone,
            password: this.registMsg.password,
            password2: this.registMsg.confirmPassword,
            name: this.registMsg.username,
            realname: this.registMsg.realname,
            email: this.registMsg.email,
            sex: this.registMsg.sex,
            birthday: this.registMsg.birthday,
            type: 0
          });
          if (response.code === 1){
            this.$Message.success('注册成功');
            setTimeout(() => {
              this.$router.history.push('/login')
            }, 1000)
          } else {
            this.$Message.error('注册失败');
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
  @import "../../assets/css/login/login.less";
  .regist {
    max-width: 600px;
  }
</style>
