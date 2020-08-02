<template>
  <div class="job-item">
    <div  class="info ivu-row">
      <div v-if="!judgehome" class="star" :style="judge1?'text-align: center;background-color:#ff9900':'text-align: center'" @click="collect">
        <Icon type="md-star" size="20" color="white" />
      </div>
      <div class=" ivu-col ivu-col-span-xs-24 ivu-col-span-lg-5" style="text-align: center">
        <img :src="require(`@/assets/images/featured-job/img-${Math.floor(Math.random()*9+1)}.png`)" alt="">
      </div>
      <div class="name ivu-col ivu-span-xs-24 ivu-span-lg-5" style="text-align: center;">
        <h2>{{ job.jobname }}</h2>
        <router-link :to="`/company-detail/${job.companyId}`">{{ job.companyname }}</router-link>
      </div>
      <div class="place ivu-col ivu-span-xs-24 ivu-span-lg-5" style="text-align:center">
        <Icon type="ios-pin" />
        {{ job.place }}
      </div>
      <div class="money ivu-col ivu-span-xs-24 ivu-span-lg-5" style="text-align: center">
        <Icon type="logo-yen" />
        {{ job.money }}
      </div>
      <div class="worktype ivu-col ivu-span-xs-24 ivu-span-lg-5" style="text-align: center">
        {{ job.worktype }}
      </div>
    </div>
    <div class="bottom">
      <span>工作经验 : {{ job.workyear }}</span>
      <span class="look-up">
        <router-link :to="'/job-detail/'+job._id">立即查看 <Icon type="ios-arrow-forward" /> </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    job: {
      type: Object,
      required: true
    },
    judgehome: {
      type: Boolean,
      required: true
    },
    judge: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      color: '',
      judge1: this.judge
    }
  },
  methods: {
    async collect() {
      console.log(this.job, this.judgehome, this.judge);
      if (this.$store.state.user.userId === null){
        this.$Message.error('请先登录');
        this.$router.history.push('/login');
        return;
      }
      if (this.judge1) { // 取消收藏
        const { data: res } = await axios.post('/student/cancelCollectJob', {
          userId: this.$store.state.user.userId,
          jobId: this.job._id
        })
        if (res.code === 1) {
          this.$Message.success('您已经取消收藏');
        } else {
          this.$Message.error(res.msg);
        }
        this.judge1 = false;
      } else { // 收藏
        const { data: res } = await axios.post('/student/collectJob', {
          userId: this.$store.state.user.userId,
          jobId: this.job._id
        })
        if (res.code === 1) {
          this.$Message.success('收藏成功');
        } else {
          this.$Message.error(res.msg);
        }
        this.judge1 = true;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.job-item {
  margin-bottom: 20px;
  border: 1px #aaa solid;
  border-radius: 10px;
  background: #f8f9fc;
  overflow: hidden;
  .info {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 0;
    position: relative;
    @media (max-width: 768px) {
      display: block;
    }
    div {
      text-align: center;
    }
    .star {
      position: absolute;
      background: #a7b9f6;
      text-align: center;
      padding: 15px 0 10px;
      width: 200px;
      left: -82px;
      top: -5px;
      transform: rotate(-45deg);
      transition: .5s;
    }
  }
  .bottom {
    background: #f0f0f4;
    padding: 10px;
    .look-up {
      margin-left: 30%;
      cursor: pointer;
    }
  }
  transition: .5s;
  &:hover {
    box-shadow: -1px -1px 10px #888;
    transform: translateY(-5px);
    transition: .5s;
    .star {
      background: #617ee4;
      transition: .5s;
    }
  }
}
</style>
