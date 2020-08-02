<template>
  <div>
    <nav-bar tabName="job-list">
      <h2 style="font-size: 25px;">发布职位</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 功能
        <Icon type="ios-arrow-forward" /> 发布职位
      </p>
    </nav-bar>
    <div class="create-Job">
      <Form ref="JobForm"
            :model="JobInfo"
            :rules="ruleValidate"
            :label-width="200">
        <h1 style="text-align:center">发布一个新职位</h1>
        <div class="baseInfo">
          <div class="flex-box" style="padding-top:10px">
            <FormItem label="职位名称：" prop="jobname">
              <Input v-model="JobInfo.jobname" size="large" />
            </FormItem>
            <FormItem label="职位类型：" prop="worktype">
              <Select v-model="JobInfo.worktype" size="large">
                  <Option value="全职">全职</Option>
                  <Option value="实习">实习</Option>
                  <Option value="全职、实习">不限</Option>
              </Select>
            </FormItem>
          </div>
           <div class="flex-box">
            <FormItem label="职位性质：" prop="type">
              <Select v-model="JobInfo.type" size="large">
                <Option value="生产制造/运营管理">生产制造/运营管理</Option>
                <Option value="客服/技术支持">客服/技术支持</Option>
                <Option value="互联网/通信及硬件">互联网/通信及硬件</Option>
                <Option value="产品/项目/高级管理">产品/项目/高级管理</Option>
                <Option value="销售/商务拓展">销售/商务拓展</Option>
                <Option value="工程/建筑/安防">工程/建筑/安防</Option>
                <Option value="教育/培训">教育/培训</Option>
                <Option value="运维/测试">运维/测试</Option>
                <Option value="化工医药/机电研发">化工医药/机电研发</Option>
                <Option value="人事/行政/财务/法务">人事/行政/财务/法务</Option>
                <Option value="其他">其他</Option>
              </Select>
            </FormItem>
            <FormItem label="工作地点：" prop="place">
              <Input v-model="JobInfo.place" size="large"  />
            </FormItem>
          </div>
           <div class="flex-box">
            <FormItem label="教育背景：" prop="edubackground">
              <Select v-model="JobInfo.edubackground">
                <Option value="不限">不限</Option>
                <Option value="高中">高中</Option>
                <Option value="专科">专科</Option>
                <Option value="本科">本科</Option>
                <Option value="硕士">硕士</Option>
                <Option value="博士">博士</Option>
              </Select>
            </FormItem>
            <FormItem label="工作年限：" prop="workyear" req>
              <Select v-model="JobInfo.workyear">
                <Option value="不限">不限</Option>
                <Option value="应届生">应届生</Option>
                <Option value="1-3年">1-3年</Option>
                <Option value="3-5年">3-5年</Option>
                <Option value="5年以上">5年以上</Option>
              </Select>
            </FormItem>
          </div>
              <div class="flex-box">
            <!-- <FormItem label="：" prop="workyear">
              <Input v-model="resumeInfo.school" size="large"  />
            </FormItem> -->
              <FormItem label="薪资待遇：" prop="money">
              <Input v-model="JobInfo.money" size="large"  />
            </FormItem>
            <FormItem label="招聘负责人：" prop="contact">
              <Input v-model="JobInfo.contact" size="large"  />
            </FormItem>
          </div>
          <div class="flex-box">
            <FormItem label="电子邮箱：" prop="email">
                <Input v-model="JobInfo.email" size="large" />
            </FormItem>
            <FormItem label="负责人联系电话：" prop="phone">
            <Input v-model="JobInfo.phone" size="large" />
            </FormItem>
            <!-- <FormItem label="民族" prop="nation">
              <Input v-model="resumeInfo.nation" size="large"  />
            </FormItem> -->
          </div>
        </div>
        <h2></h2>
        <div class="experience">
          <FormItem label="岗位要求" prop="detail1">
            <Input type="textarea" v-model="JobInfo.detail1" :rows="5" maxlength="200" show-word-limit />
          </FormItem>
          <FormItem label="工作主要内容" prop="detail2">
            <Input type="textarea" v-model="JobInfo.detail2" :rows="5" maxlength="200" show-word-limit />
          </FormItem>
          <FormItem label="福利待遇" prop="welfare">
            <Input type="textarea" v-model="JobInfo.welfare" :rows="5" maxlength="200" show-word-limit />
          </FormItem>
        </div>
      </Form>
      <Button type="primary"
              @click="handleSubmit('JobForm')"
              class="submitBtn"
              >发布岗位</Button>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      JobInfo: {
        jobname: '',
        worktype: '',
        type: '',
        place: '',
        money: '',
        edubackground: [],
        workyear: '',
        email: '',
        phone: '',
        detail1: '',
        detail2: '',
        welfare: '',
        contact: ''
      },
      ruleValidate: {
        jobname: [
          { required: true, message: '职位名称不能为空', trigger: 'blur' }
        ],
        worktype: [
          { required: true, message: '职位类型不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '职位性质不能为空', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '教育背景不能为空', trigger: 'blur' }
        ],
        edubackground: [
          { required: true, message: '薪资待遇不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '薪资待遇不能为空', trigger: 'blur' }
        ],
        workyear: [
          { required: true, message: '工作年限不能为空', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }
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
  methods: {
    async handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          const { data: res } = await axios.post('/jobs/setOneJob', {
            jobname: this.JobInfo.jobname,
            worktype: this.JobInfo.worktype,
            type: this.JobInfo.type,
            place: this.JobInfo.place,
            companyname: this.$store.state.user.username,
            money: this.JobInfo.money,
            edubackground: this.JobInfo.edubackground,
            workyear: this.JobInfo.worktype,
            email: this.JobInfo.email,
            phone: this.JobInfo.phone,
            detail1: this.JobInfo.detail1,
            detail2: this.JobInfo.detail2,
            welfare: this.JobInfo.welfare,
            contact: this.JobInfo.contact,
            companyid: this.$store.state.user.userId
          })
          if (res.code === 1) {
            alert('发布成功');
            this.$router.history.push('/');
          } else {
            alert('发布失败,请重试!');
          }
        }
      });
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/css/fun/post-jobs.less';
</style>
