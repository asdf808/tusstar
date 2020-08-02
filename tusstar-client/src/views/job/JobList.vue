<template>
  <div class="job-list">
    <nav-bar tabName="job-list">
      <h2 style="font-size: 25px;">岗位列表</h2>
      <br>
      <p>
        主页 <Icon type="ios-arrow-forward" />  工作岗位 <Icon type="ios-arrow-forward" /> 岗位列表
      </p>
    </nav-bar>

    <div class="search-job">
      <search-job style="background: #fff;border-radius:8px;"></search-job>
    </div>
    <div class="continer">
      <h1 style="text-align: center">寻找适合您的工作</h1>
      <div class="split-line"></div>
      <p style="text-align: center">您可以在左侧对工作岗位进行筛选。PS:投递前，先完善自己的简历哦</p>
      <h3 style="margin-bottom: 10px">岗位列表</h3>
      <div class="jobs">
        <job-item v-for="(job,index) in jobList" :key="job._id" :job="job" :judgehome="false" :judge="judge[index]">
        </job-item>
        <div class="page">
          <Page ref="pages" :total="totalCount" @on-change="changePage" show-total show-elevator style="float:right" />
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import SearchJob from '@/components/search/SearchJob'
import JobItem from '@/components/job/JobItem'
import axios from 'axios';
export default {
  components: {
    SearchJob,
    JobItem
  },
  data() {
    return {
      user: '',
      jobList: [],
      judgeList: [],
      totalCount: 0
    }
  },
  mounted() {
    this.requestJob();
  },
  watch: {
    '$route'(to, from) {
      this.requestJob();
      if (!this.$route.query.page){
        this.$refs.pages.currentPage = 1;
      }
    }
  },
  methods: {
    async requestJob (){
      this.$Spin.show();
      const { data: response } = await axios.get('/jobs/getJobs', {
        params: {
          ...this.$route.query
        }
      });
      if (response.code === 1){
        this.jobList = response.data.reverse();
        this.totalCount = response.totalCount
        this.judge = response.judge.reverse();
      }
      this.$Spin.hide();
    },
    changePage(page) {
      this.$router.push({
        path: '/job-list',
        query: {
          ...this.$route.query,
          page
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/job/job-list.less';
</style>
