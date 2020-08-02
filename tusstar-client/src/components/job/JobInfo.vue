<template>
  <div class="list">
    <ul>
      <li v-for="(item,index) in curJobList" :key="index">
        <img :src="require(`@/assets/images/featured-job/${ item.img }`)" alt />
        <div class="info">
          <h3>{{ item.jobname }}</h3>
          <p>
            <Icon type="ios-paper-outline" />
            <span>{{ item.companyname }}</span>
          </p>
          <p>
            <span>
              <Icon type="ios-pin" />
              <span>{{ item.place }}</span>
            </span>
            <span style="margin-left: 10px">
              <Icon type="logo-yen" />
              <span>{{ item.money }}</span>
            </span>
          </p>
        </div>
        <div class="detail">
          <div class="label" v-if="item.worktype === '实习'">实习</div>
          <Button type="primary" style="margin-top: 50px" :to="`/job-detail/${item._id}`" >查看详情</Button>
        </div>
      </li>
    </ul>
    <div class="page">
      <Page :total="jobList.length" :page-size="pageSize" @on-change="changePage" show-total show-elevator />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jobList: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      curPage: 1
    };
  },
  computed: {
    curJobList(){
      return this.jobList.slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize);
    }
  },
  methods: {
    changePage(pageNum) {
      this.curPage = pageNum;
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  ul li {
    display: flex;
    height: 120px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px #ddd solid;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    transition: .5s;
    &:hover {
      transform: translateY(-5px);
      transition: .5s;
      box-shadow: 0 0 10px #aaa;
    }
    img {
      height: 100%;
      padding: 0 15px;
    }
    .info {
      flex: 1;
      padding-left: 20px;
      h3 {
        font-size: 18px;
        color: #000;
        margin-bottom: 3px;
      }
      p {
        font-size: 16px;
      }
    }
    .detail {
      width: 100px;
      position: relative;
      text-align: right;
      .label {
        position: absolute;
        transform: rotate(45deg);
        background: rgb(90, 223, 178);
        text-align: center;
        width: 100px;
        left: 50px;
        top: -8px;
      }
    }
  }
  .page {
    margin: 30px 0;
    text-align: right;
  }
}
</style>
