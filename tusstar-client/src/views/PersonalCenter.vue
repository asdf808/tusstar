<template>
  <div id="center">
    <nav-bar>
      <h2 style="font-size: 25px;">学生中心</h2>
      <br />
      <p>
        主页
        <Icon type="ios-arrow-forward" />学生中心
      </p>
    </nav-bar>
    <div class="person-info">
      <Avatar class="avatar" shape="square" icon="ios-person" size="80" />
      <p>姓名：{{ studentInfo.name }}</p>
      <p>班级：{{ studentInfo.grade }}级 {{ studentInfo.class }}班</p>
      <p>专业：{{ studentInfo.major }}</p>
      <p>联系电话：{{ studentInfo.phone }}</p>
      <p>Email：{{ studentInfo.email }}</p>
      <p>
        <Button style="margin:2px;" type="primary" to="/modify-password">修改密码</Button>
        <Button style="margin:2px;" type="primary" to="/complete-personal">修改信息</Button>
      </p>
    </div>
    <!-- 已申请岗位、已收藏企业 -->
    <div class="user-apply" >
      <Tabs type="card">
        <TabPane label="已申请岗位">
          <div style="margin: 20px 0" v-for="job in jobList" :key="job._id">
            <Card :bordered="false">
              <p slot="title"> 职位名称：<router-link class="link" :to="`/job-detail/${job.job_id}`">{{ job.jobname }}</router-link> </p>
              <p style="float:right">
                <Tag size="large" color="orange" v-if="job.status===0">未查看</Tag>
                <Tag size="large" color="blue" v-if="job.status===1">已查看</Tag>
                <Tag size="large" color="green" v-if="job.status===2 && job.result===1">已接受</Tag>
                <Tag size="large" color="red" v-if="job.status===2 && job.result===0">已拒绝</Tag>
              </p>
              <p>企业名称：<router-link class="link" :to="`/company-detail/${job.companyId}`">{{ job.companyname }} </router-link> </p>
              <p>联系电话：{{ job.phone }} </p>
            </Card>
          </div>
        </TabPane>
        <TabPane label="已收藏职位">
          <div style="margin: 20px 0" v-for="job in collectJobs" :key="job._id">
            <Card :bordered="false">
              <p slot="title"> 职位名称：<router-link class="link" :to="`/job-detail/${job._id}`">{{ job.jobname }}</router-link> </p>
              <p style="float:right">
                <Button type="error" @click="cancelCollect(job._id)">取消收藏</Button>
              </p>
              <p>企业名称：<router-link class="link" :to="`/company-detail/${job.companyId}`">{{ job.companyname }} </router-link> </p>
              <p>联系电话：{{ job.phone }} </p>
            </Card>
          </div>
        </TabPane>
    </Tabs>
    <br>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: '',
      studentInfo: {},
      // tabs: [
      //   { tag: '未查看', list: this.jobList0, color: 'orange' },
      //   { tag: '已查看', list: this.jobList1, color: 'blue' },
      //   { tag: '已接受', list: this.jobList2, color: 'green' },
      //   { tag: '已拒绝', list: this.jobList3, color: 'red' }
      // ],
      jobList: [],
      collectJobs: []
    };
  },
  async mounted() {
    this.studentInfo = this.$store.state.user.student;
    const { data: response } = await this.$axios.get('/jobApply/getApplyJob?studentId=' + this.studentInfo._id);
    if (response.code === 1){
      this.jobList = response.applications;
    }
    const { data: response2 } = await this.$axios.get('/student/getCollectedJobInfo');
    if (response2.code === 1){
      console.log(response2.jobs);
      this.collectJobs = response2.jobs;
    }
  },
  methods: {
    cancelCollect(jobId) {
      this.$Modal.confirm({
        title: '确认取消收藏吗？',
        onOk: async () => {
          const { data: response } = await this.$axios.post('/student/cancelCollectJob', {
            userId: this.$store.state.user.userId,
            jobId
          });
          console.log(response);
          if (response.code === 1){
            this.$Message.success('取消成功');
            this.collectJobs = this.collectJobs.filter(job => {
              return job._id !== jobId;
            })
          }
        }
      });
    }
  },
  computed: {
    jobList0() {
      return this.jobList.filter(job => {
        return job.status === 0;
      })
    },
    jobList1() {
      return this.jobList.filter(job => {
        return job.status === 2;
      })
    },
    jobList2() {
      return this.jobList.filter(job => {
        return job.status === 3 && job.result === 1;
      })
    },
    jobList3() {
      return this.jobList.filter(job => {
        return job.status === 3 && job.result === 0;
      })
    }
  }
};
</script>

<style lang="less" scoped>
.person-info {
  p {
    font-size: 20px;
    text-align: center;
  }
  .avatar {
    display: block;
    margin:30px auto;
  }
}
button {
  // margin: 2px auto;
  // width: 150px;
  height: 30px;
  font-size: 18px;
}
.user-apply {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  .user-job-list {
    border: 1px #e8eaec solid;
    border-top: none
  }
}

.apply {
  width: 100%;
  margin: 0px;
  height: 32px;
  position: relative;
  background-color: #edf0fb;
  /* line-height: 50px; */
  div {
    float: left;
    width: 22.5%;
    border: 1px solid gray;
    background-color: #edf0fb;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
  }
}
.link {
  color: #17233D;
}
</style>
