<template>
  <div>
    <nav-bar tabName="company-list">
      <h2 style="font-size: 25px;">企业列表</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 功能
        <Icon type="ios-arrow-forward" /> 企业列表
      </p>
    </nav-bar>
    <div>
      <search-company></search-company>
    </div>
    <div class="company-list">
      <div class="company">
        <div class="list">
          <div v-for="company in companyList" :key="company._id" class="item">
            <company-item :company="company"></company-item>
          </div>
        </div>
      </div>
      <div>
        <Page ref="pages" :total="totalCount" :page-size="9" show-total show-elevator @on-change="changePage" style="float:right" />
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import SearchCompany from '@/components/search/SearchCompany'
import CompanyItem from '@/components/company/companyItem'
import axios from 'axios'
export default {
  components: {
    SearchCompany,
    CompanyItem
  },
  data () {
    return {
      companyList: [],
      totalCount: 0
    }
  },
  async mounted() {
    this.requestCompany();
    if (this.$route.query.page){
      this.$refs.pages.currentPage = Number(this.$route.query.page);
    }
  },
  watch: {
    '$route'(to, from) {
      this.requestCompany();
      if (!this.$route.query.page){
        this.$refs.pages.currentPage = 1;
      }
    }
  },
  methods: {
    async requestCompany (){
      this.$Spin.show();
      const { data: response } = await axios.get('/company/getCompanies', {
        params: {
          ...this.$route.query
        }
      });
      if (response.code === 1){
        this.companyList = response.data;
        this.totalCount = response.totalCount
      }
      this.$Spin.hide();
    },
    changePage(page) {
      this.$router.push({
        path: '/company-list',
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
@import "../../assets/css/company/company-list.less";
</style>
