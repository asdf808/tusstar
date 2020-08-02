<template>
  <div class="container">
    <back-home></back-home>
    <div class="regist">
      <h1>企业注册</h1>
      <Form ref="registForm"
            :model="registMsg"
            :rules="ruleValidate"
            label-position="top">
        <FormItem label="企业名称(用户名)"
                  prop="companyname">
          <Input type="text"
                 v-model="registMsg.companyname"
                 placeholder="企业名称" />
        </FormItem>
        <FormItem label="企业简称"
                  prop="name">
          <Input type="text"
                 v-model="registMsg.name"/>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="行业属性"
                      prop="companytype"
                      >
              <Select v-model="registMsg.companytype" >
                <Option value="互联网/IT/电子/通信">互联网/IT/电子/通信</Option>
                <Option value="房地产">房地产</Option>
                <Option value="金融业">金融业</Option>
                <Option value="建筑业">建筑业</Option>
                <Option value="制造业">制造业</Option>
                <Option value="农林牧渔">农林牧渔</Option>
                <Option value="批发/零售/贸易">批发/零售/贸易</Option>
                <Option value="专业服务">专业服务</Option>
                <Option value="文化/体育/娱乐">文化/体育/娱乐</Option>
                <Option value="交通运输/仓储/物流">交通运输/仓储/物流</Option>
                <Option value="能源/环保/矿产">能源/环保/矿产</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="企业性质"
                      prop="companynature" >
              <Select v-model="registMsg.companynature" >
                <Option value="国有企业">国有企业</Option>
                <Option value="私有企业">私有企业</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="注册资金(万元)"
                      prop="fund">
              <Input type="text"
                    v-model="registMsg.fund"
                    placeholder="注册资金" />
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="企业规模"
                      prop="companysize" >
              <Select v-model="registMsg.companysize" >
                <Option value="20人以下">20人以下</Option>
                <Option value="20-99人">20-99人</Option>
                <Option value="100-299人">100-299人</Option>
                <Option value="300-499人">300-499人</Option>
                <Option value="500-999人">500-999人</Option>
                <Option value="1000人以上">1000人以上</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="地区选择"
                  prop="region">
          <Cascader :data="cities" v-model="registMsg.region"></Cascader>
        </FormItem>
        <FormItem label="详细地址"
                  prop="place">
          <Input type="text"
                 v-model="registMsg.place"
                 placeholder="详细地址" />
        </FormItem>
        <FormItem label="负责人手机号"
                  prop="personphone">
          <Input type="text"
                 v-model="registMsg.personphone"
                 placeholder="手机号" />
        </FormItem>
        <FormItem label="企业邮箱"
                  prop="email">
          <Input type="email"
                 v-model="registMsg.email"
                 placeholder="企业邮箱"/>
        </FormItem>
        <FormItem label="企业官网"
                  prop="website">
          <Input type="text"
                 v-model="registMsg.website"
                 placeholder="企业官网" />
        </FormItem>
        <Row>
          <Col span="11">
            <FormItem label="总部"
                      prop="headquarters" >
              <Input type="text" v-model="registMsg.headquarters" placeholder="如没有可填无" />
            </FormItem>
          </Col>
          <Col span="11" offset="2">
            <FormItem label="是否上市"
                  prop="listed">
              <RadioGroup v-model="registMsg.listed">
                <Radio label="是" style="margin-right: 30px;">是</Radio>
                <Radio label="否">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="企业简介"
                  prop="introduce">
          <Input type="textarea" v-model="registMsg.introduce" :rows="4" placeholder="企业简介" />
        </FormItem>
        <FormItem label="密码"
                  prop="password">
          <Input type="password"
                 v-model="registMsg.password" placeholder="密码" />
        </FormItem>
        <FormItem label="确认密码"
                  prop="confirmPassword">
          <Input type="password"
                 v-model="registMsg.confirmPassword" placeholder="确认密码" />
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
import cities from '@/assets/json/cities.json';
export default {
  components: {
    BackHome
  },
  data () {
    const validateCompanyname = (rule, value, callback) => {
      if (value.trim() === ''){
        callback(new Error('企业名称不能为空'));
      }
      callback();
    }
    const validateOrgion = (rule, value, callback) => {
      if (value.length === 0){
        callback(new Error('请选择所在地区'));
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
        if (this.registMsg.passwdCheck !== '') {
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
      cities,
      registMsg: {
        companyname: '',
        name: '',
        companytype: '',
        companynature: '',
        companysize: '',
        region: [],
        place: '',
        fund: '',
        personphone: '',
        email: '',
        website: '',
        headquarters: '',
        introduce: '',
        listed: '否',
        password: '',
        confirmPassword: ''
      },
      ruleValidate: {
        personphone: [
          { required: true, message: '负责人手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号不合法', trigger: 'blur' }
        ],
        companyname: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' },
          { validator: validateCompanyname, trigger: 'blur' }
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
        ],
        region: [
          { validator: validateOrgion, trigger: 'change' }
        ],
        place: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '企业简介不能为空', trigger: 'blur' }
        ],
        companytype: [
          { required: true, message: '行业属性必须选择', trigger: 'change' }
        ],
        companynature: [
          { required: true, message: '企业性质必须选择', trigger: 'change' }
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
          } = await axios.post('/users/comRegist', {
            companyname: this.registMsg.companyname,
            name: this.registMsg.name,
            companytype: this.registMsg.companytype,
            companynature: this.registMsg.companynature,
            companysize: this.registMsg.companysize,
            place: this.registMsg.region.join('') + this.registMsg.place,
            fund: this.registMsg.fund,
            personphone: this.registMsg.personphone,
            email: this.registMsg.email,
            website: this.registMsg.website,
            headquarters: this.registMsg.headquarters,
            introduce: this.registMsg.introduce,
            listed: this.registMsg.listed,
            password: this.registMsg.password,
            password2: this.registMsg.confirmPassword
          });
          if (response.code === 1){
            this.$Message.success('注册成功');
            setTimeout(() => {
              this.$router.history.push('/login')
            }, 1000)
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
