<template>
  <div>
    <nav-bar tabName="job-list">
      <h2 style="font-size: 25px;">新建简历</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 功能
        <Icon type="ios-arrow-forward" /> 新建简历
      </p>
    </nav-bar>
    <div class="create-resume">
      <Form ref="resumeForm"
            :model="resumeInfo"
            :rules="ruleValidate"
            label-position="top">
        <h2>基本信息</h2>
        <div class="baseInfo">
          <div class="avatar">
            <label for="avatar" class="avatar-label">
              <img :src="imgUrl" alt="">
              <div class="shadow" v-if="!imgUrl">
                <Icon type="md-add" size="50" />
              </div>
            </label>
            <input type="file" id="avatar" style="display: none" @change="tirggerFile">
            <p style="text-align: center;margin: 10px auto">点击上传头像</p>
          </div>
          <div class="flex-box">
            <FormItem label="姓名" prop="name">
              <Input v-model="resumeInfo.name" size="large"  />
            </FormItem>
            <FormItem label="毕业院校" prop="school">
              <Input v-model="resumeInfo.school" size="large"  />
            </FormItem>
            <FormItem label="最高学历" prop="education">
              <Select v-model="resumeInfo.education" size="large" >
                  <Option value="高中">高中</Option>
                  <Option value="大专">大专</Option>
                  <Option value="本科">本科</Option>
                  <Option value="硕士">硕士</Option>
                  <Option value="博士">博士</Option>
                </Select>
            </FormItem>
          </div>
          <div class="flex-box">
            <FormItem label="年龄" prop="age">
                <Input v-model="resumeInfo.age" size="large" />
            </FormItem>
            <FormItem label="性别" prop="sex">
              <Select v-model="resumeInfo.sex" size="large" >
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </FormItem>
            <FormItem label="民族" prop="nation">
              <Input v-model="resumeInfo.nation" size="large"  />
            </FormItem>
          </div>
          <FormItem label="自我介绍" prop="intro">
            <Input type="textarea" v-model="resumeInfo.intro" :rows="5" maxlength="200" show-word-limit />
          </FormItem>
        </div>
        <h2>联系方式</h2>
        <div class="contact">
          <FormItem label="家庭住址" prop="address">
            <Input v-model="resumeInfo.address" size="large" />
          </FormItem>
          <Row>
            <Col span="11">
              <FormItem label="手机电话" prop="phone">
                <Input type="tel" v-model="resumeInfo.phone" />
              </FormItem>
            </Col>
            <Col span="12" offset="1">
              <FormItem label="电子邮箱" prop="email">
                <Input type="email" v-model="resumeInfo.email" />
              </FormItem>
            </Col>
          </Row>
        </div>
        <h2>教育经历</h2>
        <div class="edu">
          <Row>
            <Col span="11">
              <FormItem label="院系" prop="department">
                <Input type="tel" v-model="resumeInfo.department" />
              </FormItem>
            </Col>
            <Col span="12" offset="1">
              <FormItem label="专业" prop="major">
                <Input type="email" v-model="resumeInfo.major" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="5">
              <FormItem label="学历" prop="xueli">
                <Select v-model="resumeInfo.xueli" >
                  <Option value="高中">高中</Option>
                  <Option value="大专">大专</Option>
                  <Option value="本科">本科</Option>
                  <Option value="硕士">硕士</Option>
                  <Option value="博士">博士</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="学制" prop="xuezhi">
                <Select v-model="resumeInfo.xuezhi" >
                  <Option value="全日制">全日制</Option>
                  <Option value="非全日制">非全日制</Option>
                  <Option value="成人教育">成人教育</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12" offset="1">
              <FormItem label="入学时间" prop="admissionTime">
                <DatePicker type="date" placeholder="选择日期" v-model="resumeInfo.admissionTime" style="width:100%"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="附加信息(奖惩情况等)" prop="attach">
            <Input type="textarea" v-model="resumeInfo.attach" :rows="5" maxlength="140" show-word-limit />
          </FormItem>
        </div>
        <h2>工作/项目/实习经验</h2>
        <div class="experience">
          <FormItem label="当前（预期）薪资" prop="expectSalary">
            <Input v-model="resumeInfo.expectSalary" size="large" />
          </FormItem>
          <FormItem label="实习信息(描述主要工作、成果等)" prop="work">
            <Input type="textarea" v-model="resumeInfo.work" :rows="5" maxlength="200" show-word-limit />
          </FormItem>
        </div>
      </Form>
      <Button type="primary"
              @click="handleSubmit('resumeForm')"
              class="submitBtn"
              >保存简历</Button>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      imgUrl: '',
      resumeInfo: {
        name: '',
        school: '',
        education: '',
        age: '',
        sex: '',
        nation: '',
        intro: '',
        address: '',
        phone: '',
        email: '',
        department: '',
        major: '',
        xueli: '',
        xuezhi: '',
        attach: '',
        admissionTime: '',
        expectSalary: '',
        work: '',
        file: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '毕业院校不能为空', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '最高学历不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '民族不能为空', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '自我介绍不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号不合法', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo(){
      var userid = this.$store.state.user.userId;
      const { data: res } = await axios.get(`/resume/getResume/${userid}`);
      if (res.code === 1){
        this.resumeInfo.name = res.data.name;
        this.resumeInfo.school = res.data.school;
        this.resumeInfo.education = res.data.education;
        this.resumeInfo.age = res.data.age;
        this.resumeInfo.sex = res.data.sex;
        this.resumeInfo.nation = res.data.nation;
        this.resumeInfo.intro = res.data.intro;
        this.resumeInfo.address = res.data.address;
        this.resumeInfo.phone = res.data.phone;
        this.resumeInfo.email = res.data.email;
        this.resumeInfo.department = res.data.department;
        this.resumeInfo.major = res.data.major;
        this.resumeInfo.xueli = res.data.xueli;
        this.resumeInfo.xuezhi = res.data.xuezhi;
        this.resumeInfo.attach = res.data.attach;
        this.resumeInfo.admissionTime = res.data.admissionTime;
        this.resumeInfo.expectSalary = res.data.expectSalary;
        this.resumeInfo.work = res.data.work;
        this.imgUrl = this.$store.state.imgurl.imgurl + res.data.img.substring(7, res.data.img.length);
      } else {
        this.imgUrl = require('@/assets/images/employers/img-1.jpg');
      }
    },
    tirggerFile(e) {
      const file = event.target.files[0];
      if (!/^image\//.test(file.type)) {
        alert('请选择图片文件！');
        return;
      }
      this.resumeInfo.file = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imgUrl = e.target.result;
      };
    },
    async handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          const formData = new FormData();
          formData.append('userid', this.$store.state.user.userId);
          for (const key in this.resumeInfo){
            formData.append(key, this.resumeInfo[key]);
          }
          formData.append('img', this.imgUrl);
          const { data: res } = await axios.post('/resume/setResume', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (res.code === 1) {
            alert('修改成功');
            this.$router.history.push('/')
          } else {
            alert('修改失败，请重新修改');
          }
        }
      });
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/css/fun/create-resume.less';
</style>
