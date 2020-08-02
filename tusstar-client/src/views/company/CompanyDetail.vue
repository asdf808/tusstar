<template>
  <div>
    <nav-bar tabName="job-list">
      <h2 style="font-size: 25px;">企业信息</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 功能
        <Icon type="ios-arrow-forward" /> 企业信息
      </p>
    </nav-bar>
    <div class="job-detail">
      <div class="head">
        <img :src="require(`@/assets/images/featured-job/img-${Math.floor(Math.random()*9+1)}.png`)" alt="">
        <h1 style="margin: 20px 0">{{ companyInfo.companyname }}</h1>
        <p>
          <Icon type="ios-pin" size="20" color="#888" />
          <span class="i">{{ companyInfo.place }}</span>
          <Icon type="md-checkbox-outline" size="20" color="#4eda4e" />
          <span class="i" style="color: #4eda4e">通过验证</span>
        </p>
        <p>
          <Icon type="md-globe" size="20" color="#888" />
          <span class="i">{{ companyInfo.web }}</span>
          <Icon type="md-mail" size="20" color="#888" />
          <span class="i">{{ companyInfo.email }}</span>
          <Icon type="ios-call" size="20" color="#888" />
          <span class="i">{{ companyInfo.personphone }}</span>
        </p>
      </div>
      <div style="margin-top: 50px">
        <Divider />
          <div class="info">
            <div>
              <h2>企业规模</h2>
              <p>{{ companyInfo.companysize }}</p>
            </div>
            <div>
              <h2>类型</h2>
              <p>{{ companyInfo.companytype }}</p>
            </div>
            <div>
              <h2>发布职位</h2>
              <p>{{ jobList.length }}</p>
            </div>
            <div>
              <h2>累计简历投递</h2>
              <p>{{ resumeNum }}</p>
            </div>
          </div>
        <Divider />
      </div>
      <div class="introduce">
        <h2 class="title">公司简介:</h2>
        <p class="content">{{ companyInfo.introduce }}</p>
      </div>
      <div class="job">
        <h2 class="title">已发布工作:</h2>
        <job-info :jobList="jobList" :page-size="5" v-if="jobList.length"></job-info>
        <div v-else class="no-job">暂无</div>
      </div>
      <div class="position">
        <h2 class="title">公司地点</h2>
        <div class="map">
          <baidu-map class="bm-view" :center="companyInfo.place" :zoom="15" style="width: 100%; height:300px;" @ready="initMap">
            <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          </baidu-map>
        </div>
      </div>
      <div class="sendcomment" >
          <Input v-model="commentvalue" type="textarea" :rows="4" placeholder="留下你的评论吧..." />
          <Button type="primary" size="large" @click="sendComment" style="margin:5px 10px 0px 0px;float:right">提交</Button>
      </div>
      <div class="comment">
        <h2 class="title">企业评价:</h2>
        <company-comment :comments="comments"></company-comment>
      </div>

      <div>
  </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import JobInfo from '@/components/job/JobInfo'
import CompanyComment from '@/components/company/CompanyComment'
import axios from 'axios'

export default {
  components: {
    JobInfo,
    CompanyComment
  },
  data() {
    return {
      companyInfo: {},
      jobList: [],
      resumeNum: 0,
      center: '',
      commentvalue: '',
      comments: [
      ],
      position: {}
    }
  },
  async mounted() {
    const cid = this.$route.params.cid;
    axios.get('/company/getById/' + cid).then(({ data: response }) => {
      if (response.code === 1){
        this.companyInfo = response.data;
      }
    })
    axios.get('/jobs/getFromCompany?cid=' + cid).then(({ data: response }) => {
      if (response.code === 1){
        this.jobList = response.data;
      }
    })
    axios.get('/company/getComments', {
      params: {
        companyId: this.$route.params.cid
      }
    }).then(({ data: response }) => {
      if (response.code === 1) {
        var list = [];
        for (let i = 0; i < response.data.length; i++) {
          list[i] = {};
          list[i].name = response.data[i].name;
          list[i].time = response.data[i].date.toString();
          list[i].job = response.data[i].profession;
          list[i].content = response.data[i].content;
        }
        this.comments = list.reverse();
      }
    })
  },
  methods: {
    async sendComment(){
      if (this.commentvalue === '') {
        this.$Message.error('请先输入评论内容');
      } else if (this.$store.state.user.type === 1) {
        this.$Message.error('企业用户不能评价其他企业哦！');
      } else {
        console.log(this.$store.state.user.type);
        const { data: res } = await axios.post('/company/setComment', {
          studentId: this.$store.state.user.userId,
          companyId: this.$route.params.cid,
          content: this.commentvalue
        })
        if (res.code === 1) {
          this.$Message.success('提交成功');
          let newComment = {};
          newComment = {
            name: res.data.name,
            time: res.data.date,
            job: res.data.profession,
            content: res.data.content
          };
          this.comments.splice(0, 0, newComment);
          console.log(this.comments, 'com');
        } else {
          this.$Message.error('提交失败');
        }
      }
    },
    initMap ({ BMap, map }) {
      const fn = () => {
        setTimeout(() => {
          if (map.loaded){
            this.position = { lng: map.re.lng, lat: map.re.lat }
          } else {
            fn();
          }
        }, 50)
      }
      fn()
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/company/company-detail.less";
</style>
