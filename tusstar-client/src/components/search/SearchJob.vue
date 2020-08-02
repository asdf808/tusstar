<template>
  <div class="search">
    <div class="search-bar">
      <Input size="large" class="search-item" prefix="ios-paper-plane" placeholder="工作地点" v-model="place" />
      <Select v-model="jobType" size="large" prefix="md-apps" placeholder="职位类型" class="search-item small-font-select" >
        <Option value="">不限</Option>
        <Option value="销售/商务拓展">销售/商务拓展</Option>
        <Option value="人事/行政/财务/法务">人事/行政/财务/法务</Option>
        <Option value="互联网/通信及硬件">互联网/通信及硬件</Option>
        <Option value="视觉/交互/设计">视觉/交互/设计</Option>
        <Option value="金融/保险">金融/保险</Option>
        <Option value="生产制造/运营管理">生产制造/运营管理</Option>
        <Option value="运营/专业分析">运营/专业分析</Option>
        <Option value="客服/技术支持">客服/技术支持</Option>
        <Option value="物流/采购/供应链">物流/采购/供应链</Option>
        <Option value="商务服务/生活服务">商务服务/生活服务</Option>
        <Option value="管培生/非企业从业者理">管培生/非企业从业者</Option>
        <Option value="市场/品牌/公关">市场/品牌/公关</Option>
        <Option value="编辑/记者/翻译">编辑/记者/翻译</Option>
        <Option value="工程/建筑/安防">工程/建筑/安防</Option>
        <Option value="产品/项目/高级管理">产品/项目/高级管理</Option>
        <Option value="教育/培训">教育/培训</Option>
        <Option value="场务/演艺/影视">场务/演艺/影视</Option>
        <Option value="运维/测试">运维/测试</Option>
        <Option value="化工医药/机电研发">化工医药/机电研发</Option>
        <Option value="医疗/医美/医务">医疗/医美/医务</Option>
      </Select>
      <Select v-model="worktype" size="large" prefix="ios-briefcase" placeholder="工作类型" class="search-item" >
        <Option value="">不限</Option>
        <Option value="实习">实习</Option>
        <Option value="全职">全职</Option>
      </Select>
      <Input size="large" class="search-keyword" search enter-button placeholder="工作名称" v-model="keyword" @on-search="search" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      place: this.$route.query.place,
      jobType: this.$route.query.jobType,
      worktype: this.$route.query.worktype,
      keyword: this.$route.query.keyword
    }
  },
  methods: {
    search() {
      const query = {};
      if (this.place){
        query.place = this.place;
      }
      if (this.jobType){
        query.jobType = this.jobType;
      }
      if (this.worktype){
        query.worktype = this.worktype;
      }
      if (this.keyword){
        query.keyword = this.keyword;
      }
      this.$router.push({
        path: '/job-list',
        query
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    width: 80%;
    margin: 0 auto;
    .search-bar{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      padding: 15px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      .search-item {
        flex:0 0 22%;
      }
      .search-keyword {
        flex: 0 0 28%;
      }
      @media (max-width:768px){
        .search-item, .search-keyword{
          flex:0 0 100%;
        }
        .search-item {
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
