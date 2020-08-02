<template>
  <div>
    <nav-bar tabName="job-detail">
      <h2 style="font-size: 25px;">岗位描述</h2>
      <br>
      <p>
        主页 <Icon type="ios-arrow-forward" />  工作岗位 <Icon type="ios-arrow-forward" /> 岗位描述
      </p>
    </nav-bar>
    <div class="job-detail">
      <Row style="width: 100%">
        <Col :xs="24" :sm="24" :lg="15">
          <div class="left">
            <div class="msg">
              <img :src="require(`@/assets/images/featured-job/${ jobDetail.img ? jobDetail.img: 'img-1.png'  }`)" alt="">
              <div>
                <h2>{{ jobDetail.jobname }}</h2>
                <p style="padding-top: 10px;"><Icon type="ios-pin" /> {{ jobDetail.place }}</p>
              </div>
              <!-- <p>{{ jobDetail.companyname }}</p>
              <p>{{ jobDetail.worktype }}</p> -->
            </div>
            <h2 class="title">岗位要求</h2>
            <div class="require">{{ jobDetail.detail1 }}</div>
            <h2 class="title">主要工作内容</h2>
            <div class="work">{{ jobDetail.detail2 }}</div>
          </div>
        </Col>
        <Col :xs="{ span: 20, offset: 2 }" :sm="{ span: 14, offset: 5 }" :lg="{ span: 7, offset: 2 }" >
          <div class="right">
            <div class="info">
              <h2><Icon type="ios-briefcase" style="margin-right:5px" />工作信息</h2>
              <Divider />
              <p>
                <span class="icon"><Icon type="ios-home" /></span>：
                <router-link to="/" style="color: #515a6e" >{{ jobDetail.companyname }}</router-link>
              </p>
              <p><span class="icon"><Icon type="md-mail" /></span>：{{ jobDetail.email }}</p>
              <p><span class="icon"><Icon type="ios-paper" /></span>：{{ jobDetail.edubackground }}</p>
              <p><span class="icon"><Icon type="ios-phone-portrait" /></span>：{{ jobDetail.phone }}</p>
              <p><span class="icon"><Icon type="logo-usd" /></span>：{{ jobDetail.money }}</p>
              <p><span class="icon"><Icon type="ios-timer" /></span>：{{ jobDetail.workyear }}</p>
            </div>
            <template v-if="this.$store.state.user.type === 0">
              <Button type="primary" long class="applybtn" disabled v-if="isApply" >该职位已申请</Button>
              <Button type="primary" long class="applybtn" :loading="loading" @click="applyJob" v-else >申请这份职位</Button>
            </template>
          </div>
        </Col>
      </Row>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      jobDetail: {},
      isApply: false,
      loading: false
    }
  },
  async created(){
    const jobId = this.$route.params.jobid
    if (jobId){
      this.$Spin.show();
      const { data: response } = await axios.get(`/jobs/getById/${jobId}`);
      if (response.code === 1){
        this.jobDetail = response.data;
      }
      if (this.$store.state.user.type === 0){
        const { data: response2 } = await axios.get('/jobApply/checkApply', {
          params: {
            jobId,
            studentId: this.$store.state.user.userId
          }
        });
        if (response2.code === 1){
          this.isApply = response2.isApply;
        }
      }
      this.$Spin.hide();
    }
  },
  methods: {
    async applyJob() {
      const jobId = this.$route.params.jobid;
      const studentId = this.$store.state.user.userId
      this.loading = true;
      const { data: hasResume } = await axios.get(`/resume/hasResume?studentId=${studentId}`)
      if (hasResume) {
        const { data: response } = await axios.post('/jobApply/apply', {
          jobId,
          studentId
        });
        if (response.code === 1){
          this.$Message.success('申请成功');
          this.isApply = true;
        } else {
          this.$Message.error('申请失败');
        }
      } else {
        this.$Message.error('请先完善简历');
      }
      this.loading = false;
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/job/job-detail.less';
</style>
