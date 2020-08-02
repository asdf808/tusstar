<template>
  <div>
    <nav-bar tabName="contact">
      <h2 style="font-size: 25px;">联系我们</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 联系我们
      </p>
    </nav-bar>
    <div class="contact">
      <div class="map map-box">
        <baidu-map class="bm-view" center="西宁青海大学" :zoom="15"></baidu-map>
        <div class="address">
          <h2>地址信息</h2>
          <div class="detail">
            <div class="icon">
              <span><Icon type="ios-pin" size="40" color="#2f55d4" /></span>
            </div>
            <p>青海省</p>
            <p>西宁市</p>
            <p>城北区</p>
          </div>
        </div>
      </div>
      <h2 style="margin-top: 50px">给我们留言:</h2>
        <div class="message">
          <Form :model="message">
            <Row>
              <Col span="10">
                <FormItem label="您的姓名" prop="name">
                  <Input v-model="message.name" size="large"></Input>
                </FormItem>
              </Col>
              <Col span="10" offset="1">
                <FormItem label="您的邮箱地址" prop="email">
                  <Input v-model="message.email" size="large"></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="主题" prop="theme">
              <Input v-model="message.theme" size="large"></Input>
            </FormItem>
            <FormItem label="留言信息" prop="content">
              <Input v-model="message.content" type="textarea" :rows="5"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit" style="float:right;width:200px" size="large">发送留言</Button>
            </FormItem>
          </Form>
        </div>
    </div>
    <div class="container">
      <div v-for="(item,index) in contacts" :key="index" class="item">
        <div class="icon-box">
          <Icon :type="item.icon" color="#2f55d4" size="35"/>
        </div>
        <div style="padding-left: 20px">
          <h1>{{ item.title }}</h1>
          <p>{{ item.val }}</p>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        name: '',
        email: '',
        theme: '',
        content: ''
      },
      contacts: [
        {
          icon: 'md-globe',
          title: '官方网站',
          val: 'www.tusstar.com'
        },
        {
          icon: 'ios-call',
          title: '联系电话',
          val: '13911861679'
        },
        {
          icon: 'md-mail',
          title: '电子邮箱',
          val: 'xiongk@tusstar.com'
        }
      ]
    }
  },
  methods: {
    handleSubmit(){

    }
  }
}
</script>

<style lang="less" scoped>
.contact {
  width: 90%;
  margin: 30px auto;
  .map-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bm-view {
      width: 70%;
      height: 400px;
    }
    .address {
      width: 25%;
      border: 1px #2f55d4 solid;
      border-radius: 10px;
      h2 {
        text-align: center;
        margin-top: 20px;
      }
      .detail {
        position: relative;
        width: 80%;
        margin: 50px auto 30px;
        border: 1px #2f55d4 solid;
        border-radius: 10px;
        padding: 50px 0;
        p {
          text-align: center;
          margin-top: 20px;
          font-weight: 600;
          font-size: 16px;
          color: #777;
        }
        .icon {
          position: absolute;
          height: 80px;
          width: 80px;
          border: 1px #2f55d4 solid;
          border-radius: 50%;
          background: white;
          display: flex;
          justify-content: space-around;
          align-items: center;
          top: -40px;
          left:50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .message {
    margin-top: 20px;
    border: 1px #aaaaaa solid;
    border-radius: 10px;
    padding: 20px;
    padding-bottom: 0;
  }
}
.container {
  display: flex;
  background: #f8f9fc;
  padding: 80px 8%;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    display: flex;
    @media (max-width: 768px) {
      margin: 20px auto;
    }
    .icon-box {
      padding: 15px;
      border: 1px #2f55d4 solid;
      border-radius: 50%;
    }
  }
}
</style>
