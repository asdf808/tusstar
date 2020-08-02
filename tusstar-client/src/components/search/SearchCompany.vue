<template>
<div class="search">
    <div class="search-bar">
      <Input size="large" class="search-item" prefix="ios-paper-plane" placeholder="公司地点" v-model="place" />
      <Select v-model="companytype" prefix="md-apps" placeholder="企业类型" class="search-item">
        <Option value="">不限</Option>
        <Option value="互联网/IT/电子/通信">互联网/IT/电子/通信</Option>
        <Option value="房地产">房地产</Option>
        <Option value="金融业">金融业</Option>
        <Option value="建筑业">建筑业</Option>
        <Option value="制造业">制造业</Option>
        <Option value="农林牧渔">农林牧渔</Option>
        <Option value="批发/零售/贸易">批发/零售/贸易</Option>
        <Option value="专业服务">专业服务</Option>
        <Option value="文化/体育/娱乐">文化/体育/娱乐</Option>
        <Option value="交通运输/仓储/物流">交通运输/仓储/物流</Option>
        <Option value="能源/环保/矿产">能源/环保/矿产</Option>
      </Select>
      <Select v-model="companysize" prefix="ios-people" placeholder="企业规模" class="search-item">
        <Option value="">不限</Option>
        <Option value="20人以下">20人以下</Option>
        <Option value="20-99人">20-99人</Option>
        <Option value="100-299人">100-299人</Option>
        <Option value="300-499人">300-499人</Option>
        <Option value="500人以上">500人以上</Option>
      </Select>
      <Select v-model="companynature" prefix="ios-cube" placeholder="企业性质" class="search-item">
        <Option value="">不限</Option>
        <Option value="国有企业">国有企业</Option>
        <Option value="私有企业">私有企业</Option>
      </Select>
      <Input search enter-button placeholder="企业关键字" class="search-keyword" v-model="keyword" @on-search="search" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      place: this.$route.query.place,
      companytype: this.$route.query.companytype,
      companysize: this.$route.query.companysize,
      companynature: this.$route.query.companynature,
      keyword: this.$route.query.keyword
    }
  },
  methods: {
    search() {
      const query = {};
      if (this.place){
        query.place = this.place;
      }
      if (this.companytype){
        query.companytype = this.companytype;
      }
      if (this.companysize){
        query.companysize = this.companysize;
      }
      if (this.companynature){
        query.companynature = this.companynature;
      }
      if (this.keyword){
        query.keyword = this.keyword;
      }
      this.$router.push({
        path: '/company-list',
        query
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    width: 90%;
    margin: 50px auto;
    .search-bar{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      padding: 15px;
      border-radius: 8px;
      background: #f8f9fc;
      border: 1px #bbb solid;
      .search-item {
        flex:0 0 18%;
      }
      .search-keyword {
        flex: 0 0 22%;
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
