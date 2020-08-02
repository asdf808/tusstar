<template>
  <div class="company">
    <div class="img-box">
      <img :src="require(`@/assets/images/employers/img-${Math.floor(Math.random()*9+1)}.jpg`)" alt="">
    </div>
    <h3 class="company-name">{{ company.companyname }}</h3>
    <p>{{ company.companynature }}</p>
    <p><Icon type="ios-pin" />{{ company.place }}</p>
    <p>
      <template v-if="Math.floor(company.mark)">
        <Icon type="md-star" v-for="index in Math.floor(company.mark)" :key="index"/>
      </template>
      <Icon v-if="company.mark % 1" type="md-star-half" />
      <template v-if="5-Math.ceil(company.mark)">
        <Icon type="md-star-outline" v-for="index in 5-Math.ceil(company.mark)" :key="index+100" />
      </template>
      <Tag color="success">{{ company.mark }}</Tag>
    </p>
    <p>{{ company.companytype }}</p>
    <Button type="primary" :to="`/company-detail/${company._id}`">查看详情</Button>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.company {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px #aaa solid;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 320px;
  padding: 10px;
  text-align: center;
  .img-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .company-name {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
