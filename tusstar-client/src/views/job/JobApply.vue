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
    <div class="apply-info">
      <h2>岗位名称：{{ job.jobname }}</h2>
      <Menu mode="horizontal" style="background: transparent" active-name="1" @on-select="handleSelect">
        <MenuItem name="1">
            未查看
        </MenuItem>
        <MenuItem name="2">
            已面试
        </MenuItem>
        <MenuItem name="3">
            已处理
        </MenuItem>
      </Menu>
      <Table border stripe :columns="columns" :data="tableData">
        <template slot-scope="{ row, index }" slot="action" v-if="curStatus === 0 || curStatus === 1">
          <Button type="primary" size="small" class="operate-btn" @click="showResume(row,index)">查看简历</Button>
          <Button type="info" size="small" v-if="curStatus === 0" class="operate-btn" @click="process(row,'adviceInterview')">通知面试</Button>
          <Button type="success" size="small" class="operate-btn" @click="process(row,'accept')">接受</Button>
          <Button type="error" size="small" class="operate-btn" style="margin-right:0" @click="process(row,'reject')">拒绝</Button>
        </template>
      </Table>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applications: [],
      job: {},
      curStatus: 0
    }
  },
  async mounted() {
    const jobId = this.$route.params.jobId;
    const { data: response } = await this.$axios.get(`/jobApply/getApplyStudent/${jobId}`);
    if (response.code === 1){
      this.applications = response.applications;
      this.job = response.job;
    }
  },
  methods: {
    handleSelect(name) {
      if (name === '1'){
        this.curStatus = 0;
      }
      if (name === '2'){
        this.curStatus = 1;
      }
      if (name === '3'){
        this.curStatus = 2;
      }
    },
    async process(row, api) {
      const { data: response } = await this.$axios.post('/jobApply/' + api, {
        studentId: row.studentId,
        jobId: this.$route.params.jobId
      });
      if (response.code === 1){
        this.update()
      }
    },
    async showResume(row, index){
      console.log(row);
    },
    async update() {
      const { data: response } = await this.$axios.get(`/jobApply/getApplyStudent/${this.$route.params.jobId}`);
      if (response.code === 1){
        this.applications = response.applications;
        console.log(response);
      }
    },
    dateFormat(time){
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + min
    }
  },
  computed: {
    columns(){
      const arr = [
        { title: '学号', key: 'studentNo', minWidth: 130, align: 'center' },
        { title: '姓名', key: 'name', minWidth: 95, align: 'center' },
        { title: '专业', key: 'major', minWidth: 150, align: 'center' },
        { title: '年级', key: 'grade', minWidth: 72, align: 'center' },
        { title: '投递时间', key: 'applyTime', minWidth: 150, align: 'center' }
      ]
      if (this.curStatus === 0){
        return [...arr, { title: '操作', slot: 'action', minWidth: 260, align: 'center' }]
      } else if (this.curStatus === 1) {
        return [...arr, { title: '操作', slot: 'action', minWidth: 200, align: 'center' }]
      } else {
        return [...arr, { title: '状态', key: 'result', minWidth: 75, align: 'center' }]
      }
    },
    tableData() {
      return this.applications.filter(application => {
        return application.status === this.curStatus;
      }).map(application => {
        const data = {};
        data.studentId = application.student._id;
        data.studentNo = application.student.studentNo;
        data.name = application.student.name;
        data.grade = application.student.grade;
        data.major = application.student.major;
        data.applyTime = this.dateFormat(application.applyTime);
        data.result = application.result === 1 ? '接受' : '拒绝';
        return data;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.apply-info {
  width: 90%;
  padding: 20px;

  margin: 0 auto;
  background: #EDF0FB;
  .operate-btn {
    margin-right: 5px;
    font-size:12px
  }
}
</style>
