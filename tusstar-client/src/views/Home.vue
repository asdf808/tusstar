<template>
  <div class="home">
    <nav-bar tabName="home" style="height: 690px;">
      <h1 style="font-size: 45px;text-align: center;">快速寻找一个适合自己的工作岗位</h1>
      <search-job></search-job>
    </nav-bar>
    <!-- 职位信息 -->
    <div class="job-info">
      <h1 style="text-align: center">职位信息</h1>
      <div class="split-line"></div>
      <p style="text-align: center">根据工作类型，快速选择一批符合您需求的工作岗位</p>
      <div class="category-box">
        <div v-for="(item,index) in jobInfo" :key="index" class="continer">
          <div class="icon-box">
            <Icon :type="item.icon" size="24" color="#2f55d4" />
          </div>
          <p class="type">{{ item.label }}</p>
          <br>
          <p class="count">{{ item.count }}个岗位</p>
        </div>
        <div class="btn-box">
          <Button size="large" type="primary" to="/job-list" >浏览所有职位<Icon type="ios-arrow-forward" /></Button>
        </div>
      </div>
    </div>
    <!-- 推荐职位 -->
    <div class="job-recommend">
      <h1 style="text-align: center">推荐的职位</h1>
      <div class="split-line"></div>
      <p style="text-align: center">启迪之星精心为各位求职者推荐的优质企业</p>
      <div class="recommend">
        <div v-for="(item,index) in ['最近发布', '最受欢迎', '实习岗位', '全职岗位']"
          :key="index"
          :class="curIndex===index?'active':''"
          @click="changeTab(index)"
        >
          {{item}}
        </div>
      </div>
      <div class="jobs">
        <job-item v-for="job in jobList" :key="job._id" :job="job" :judgehome="true" :judge="false"></job-item>
        <Button class="look-more" type="primary" size="large" to="/job-list" >查看更多</Button>
      </div>
    </div>

    <!-- 怎样找到一个好工作 -->
    <div class="find-job" style="height: 500px">
      <h1 style="text-align: center">怎样找到一个好工作</h1>
      <div class="split-line"></div>
      <p style="text-align: center">快速完善您的简历，找到一个适合自己的好工作</p>
      <div class="category-box">
        <div v-for="(item,index) in steps" :key="index" class="continer">
          <div class="img-box">
            <img :src="item.img" alt="">
          </div>
          <h2 class="title">{{ item.title }}</h2>
          <p class="text">{{ item.text }}</p>
          <router-link :to="item.link" class="read-more">Read more <Icon type="ios-arrow-forward" /></router-link>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="bg-gray"></div>
      <div class="category-box">
        <div v-for="(item,index) in statData" :key="index" class="continer">
          <div class="count">
            <Icon :type="item.icon" size="30px" />
            {{ item.count }}
          </div>
          <p class="text">{{ item.text }}</p>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchJob from '@/components/search/SearchJob'
import JobItem from '../components/job/JobItem'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    SearchJob,
    JobItem
  },
  data() {
    return {
      jobInfo: [
        {
          icon: 'md-laptop',
          label: '软件开发类',
          count: 780
        },
        {
          icon: 'ios-briefcase',
          label: '技术类',
          count: 952
        },
        {
          icon: 'ios-home',
          label: '政府、事业单位类',
          count: 1280
        },
        {
          icon: 'logo-usd',
          label: '金融类',
          count: 1875
        },
        {
          icon: 'ios-train',
          label: '建筑实施类',
          count: 468
        },
        {
          icon: 'ios-paper-plane',
          label: '通信类',
          count: 583
        },
        {
          icon: 'ios-easel',
          label: '多媒体设计类',
          count: 841
        },
        {
          icon: 'ios-people',
          label: '人力资源类',
          count: 1573
        }
      ],
      curIndex: 0,
      steps: [
        {
          img: require('../assets/images/how-it-work/img-1.png'),
          title: '注册一个账号',
          text: '注册一个账号，然后认真填写并完善您的简历',
          link: '/regist'
        },
        {
          img: require('../assets/images/how-it-work/img-2.png'),
          title: '寻找一个工作',
          text: '根据您的兴趣爱好和所学专业，筛选出一个适合自己的工作',
          link: '/job-list'
        },
        {
          img: require('../assets/images/how-it-work/img-3.png'),
          title: '投递简历',
          text: '将自己的简历发给中意的企业，耐心等待企业的回复',
          link: '/create-resume'
        }
      ],
      jobList: [],
      statData: [
        {
          icon: 'ios-home',
          count: 0,
          text: '入驻公司'
        },
        {
          icon: 'md-list-box',
          count: 0,
          text: '岗位总计'
        },
        {
          icon: 'ios-send',
          count: 0,
          text: '累计申请'
        },
        {
          icon: 'md-person-add',
          count: 0,
          text: '注册用户'
        }
      ],
      curPage: 1
    }
  },
  async mounted() {
    this.$Spin.show();
    await this.requestJob();
    this.$Spin.hide();
    await this.getMessage();
  },
  computed: {
    curJobs() {
      if (this.curIndex === 2){
        return this.jobs.filter(job => {
          return job.worktype === '实习'
        })
      } else if (this.curIndex === 3) {
        return this.jobs.filter(job => {
          return job.worktype === '全职'
        })
      }
      return this.jobs;
    }
  },
  methods: {
    async getMessage() {
      const { data: res } = await axios.get('/users/getMessage');
      if (res.code === 1) {
        this.statData[0].count = res.data[0];
        this.statData[1].count = res.data[1];
        this.statData[2].count = res.data[2];
        this.statData[3].count = res.data[3];
      } else {
        console.log('获取统计信息失败');
      }
    },
    judge(data) {
      return data.judge;
    },
    changeTab(index) {
      switch (index) {
        case 0:
          this.requestJob();
          break;
        case 1:
          this.requestJob();
          break;
        case 2:
          this.requestJob({ worktype: '实习' });
          break;
        case 3:
          this.requestJob({ worktype: '全职' });
          break;
      }
      this.curIndex = index
    },
    async requestJob (params){
      const { data: response } = await axios.get('/jobs/getJobs', {
        params: {
        }
      });
      if (response.code === 1){
        this.jobList = response.data.reverse();
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/css/home/home.less';
</style>
