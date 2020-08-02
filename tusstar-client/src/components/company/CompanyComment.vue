<template>
  <div class="company-comment">
    <div class="comment" v-for="(comment,index) in comments" :key="index">
      <div class="img">
        <img :src="require(`@/assets/images/employers/img-${Math.floor(Math.random()*9+1)}.jpg`)" alt="">
      </div>
      <div class="right">
        <p>
          <span class="username">{{ comment.name }}</span>
          <span style="float: right"><Icon type="md-time" /> {{ comment.time | dateFormat }}</span>
        </p>
        <p class="job"><Icon type="ios-paper-outline" /> {{ comment.job }}</p>
        <p class="content">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  filters: {
    dateFormat(time){
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const min = date.getMinutes();
      return year + '-' + month + '-' + day + ' ' + hour + ':' + min
    }
  }
}
</script>

<style lang="less" scoped>
.company-comment {
  .comment {
    padding: 10px 20px;
    margin: 25px 0;
    border:1px #ddd solid;
    border-radius: 10px;
    box-shadow: 0 0 5px #ddd;
    display: flex;
    .img {
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
      float: left;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      // border: 1px #000 solid;
      padding-left: 20px;
      .username {
        font-size: 20px;
        font-weight: 600;
      }
      .job {
        font-size: 16px;
        font-weight: 600;
        color: #777;
      }
      .content {
        margin-top: 10px;
        color: #000;
        // font-size: 1px;
      }
    }
  }
}
</style>
