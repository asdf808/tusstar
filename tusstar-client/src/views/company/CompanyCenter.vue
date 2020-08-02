<template>
  <div>
    <nav-bar tabName="">
      <h2 style="font-size: 25px;">
        企业中心
      </h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 企业中心
      </p>
    </nav-bar>
    <div>
        <div class="cname">
          <h1>
            <Icon type="ios-baseball" />&nbsp;{{ company.companyname }}
            <Button class="right" to="/modify-password">修改密码</Button>
            <Button class="right" to="/modify-information">更改企业信息</Button>
          </h1>
          <ul class="info">
            <li>地点：{{ company.place ? company.place : '无' }}</li>
            <li>邮箱：{{ company.email ? company.email : '无' }}</li>
            <li>电话：{{ company.personphone ? company.personphone : '无' }}</li>
          </ul>
          <Button type="info" class="btn-info" :to="`/company-detail/${company._id}`">查看详情</Button>
    </div>

    <div class="publish_job">
      <h1>已发布岗位列表</h1>
      <div class="post_list" v-for="job in jobList" :key="job._id">
        <Badge class="badge-box" :count="job.unreadcount">
          <h2>
            <Icon type="ios-paper" />&nbsp;{{ job.jobname }}
            <Button class="right" to="/modify-information">修改职位信息</Button>
            <Button class="right" @click="deleteJob(job._id)">删除职位</Button>
          </h2>
          <ul class="info">
            <li>类型：{{ job.worktype }}</li>
            <li>联系人：{{ job.contact }}</li>
            <li>联系电话：{{ job.phone }}</li>
            <li>
              <h3>
                投递数量：{{ job.applycount }}
                <span style="margin-left:20px"></span>
                未读数量：{{ job.unreadcount }}
                <Button v-if="job.applycount > 0" class="right" :to="`/job-apply/${job._id}`">查看投递情况</Button>
                <Button v-else class="right" disabled>暂无投递信息</Button>
              </h3>
            </li>
          </ul>
        </Badge>
      </div>
    </div>
  </div>
  <footer-bar></footer-bar>
  </div>

</template>

<script>
export default {
  data () {
    return {
      columns1: [
        { title: '姓名', key: 'name' },
        { title: '申请岗位', key: 'position' },
        { title: '联系电话', key: 'phone' },
        { title: '处理结果', key: 'result' }
      ],
      company: {},
      jobList: []
    }
  },
  mounted() {
    this.company = this.$store.state.user.company;
    let jobList;
    this.$axios.get('/jobs/getFromCompany?cid=' + this.company._id).then(({ data: response }) => {
      if (response.code === 1){
        jobList = response.data;
        jobList.sort((job1, job2) => {
          if (job2.unreadcount !== job1.unreadcount){
            return job2.unreadcount - job1.unreadcount;
          } else {
            return job2.applycount - job1.applycount;
          }
        })
        this.jobList = jobList
      }
    })
  },
  methods: {
    deleteJob(jobId) {
      this.$Modal.confirm({
        title: '确认要删除该职位吗？',
        onOk: async () => {
          const { data: response } = await this.$axios.delete(`/jobs/deleteJob/${jobId}`);
          if (response.code === 1){
            this.$Message.success('删除成功');
            this.jobList = this.jobList.filter(job => {
              return job._id !== jobId;
            })
          }
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.right{
    float: right;
    margin-left: 10px;
}
.row{
    height:45px;
    padding: 5px 0px 0px 0px;
    font-family: "Nunito", '微软雅黑', sans-serif;
    font-weight: bold;
    text-align: center;
    // border: double;
}
.cname{
    width: 80%;
    margin: 30px auto;
    margin-top:50px;
    background: #EDF0FB;
    border: solid 2px #CDCDCD;
    padding: 15px;
    .row{
      font-size: 17px;
    }
    .info {
      font-size: 16px;
      padding-left: 40px;
      li {
        margin-top: 10px;
      }
    }
    .btn-info {
      display: block;
      margin: 30px auto 0;
      width: 20%;
      min-width: 100px;
      height: 35px;
      line-height: 35px;
    }
}
.publish_job{
    width: 80%;
    border: solid 2px #CDCDCD;
    margin: 10px auto 40px;
    background: #EDF0FB;
    padding-bottom: 25px;
    .post_list{
      width: 90%;
      margin: 10px auto;
      border: solid 2px #CDCDCD;
      .badge-box {
        width: 100%;
        padding: 20px;
      }
      .info {
        padding-left: 30px;
        li {
          margin-top: 6px;
        }
      }
      .row{
        font-size: 17px;
      }
    }
    .stu_result{
        width: 90%;
        margin-top: 10px;
        margin: 20px auto;
        // border: solid 2px #CDCDCD;
    }
    h1{
        padding: 10px;
        font-family: "Nunito", '微软雅黑', sans-serif;
}
  }
    .but:active{
      background:blue;
    }

</style>
