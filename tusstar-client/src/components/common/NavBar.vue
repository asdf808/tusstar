
<template>
  <header>
    <div class="bg-gray"></div>
    <div class="top-nav" v-show="!hideTop">
      <div class="left">启迪之星-在线人才招聘</div>
      <div class="right">
        <template v-if="this.$store.state.user.userId">
          <div class="username">
            <Icon type="md-person" />
            <span>{{ this.$store.state.user.username }}</span>
          </div>
          <div style="margin-left: 15px">
            <Icon type="ios-contact" />
            <router-link to="/personal-center" style="color: #fff" v-if="this.$store.state.user.type === 0">个人中心</router-link>
            <router-link to="/company-center" style="color: #fff" v-if="this.$store.state.user.type === 1">企业中心</router-link>
          </div>
          <div style="margin-left: 15px">
            <span @click="modal1 = true" style="cursor: pointer">退出登录</span>
            <Modal
              v-model="modal1"
              width="300"
              @on-ok="exit"
            >
              <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>warning</span>
              </p>
              <div style="text-align:center">
                  <p>确认要退出登录吗？</p>
              </div>
            </Modal>
          </div>
        </template>
        <template v-else>
          <div>
            <Icon type="md-person" />
            <router-link to="/login" style="color: #fff">请登录</router-link>
          </div>
        </template>
      </div>
    </div>
    <div :class="['menubox1',hideTop?'menubox2':'']" >
      <Menu mode="horizontal" class="menu" :theme="hideTop?'light':'dark'" @on-select="handleSelect" :active-name="tabName">
        <MenuItem name="home">
          <Icon type="ios-home" />主页
        </MenuItem>
        <MenuItem name="job-list">
          <Icon type="ios-list-box" />岗位列表
        </MenuItem>
        <MenuItem name="company-list">
          <Icon type="md-aperture" />企业列表
        </MenuItem>
        <!-- <Submenu name="3">
          <template slot="title">
            <Icon type="md-cube" />功能
          </template>
          <MenuItem name="about">关于我们</MenuItem>
          <MenuItem name="questions">常见问题</MenuItem>
          <MenuItem name="company-list">企业列表</MenuItem>
          <MenuItem name="candidates-list">应聘者列表</MenuItem>
          <MenuItem name="create-resume">新建简历</MenuItem>
        </Submenu> -->
        <!-- <Submenu name="4">
          <template slot="title">
            <Icon type="md-contact" />用户中心
          </template>
          <MenuItem name="login">登录</MenuItem>
          <MenuItem name="regist">用户注册</MenuItem>
          <MenuItem name="company-regist">企业注册</MenuItem>
          <MenuItem name="find-password">忘记密码</MenuItem>
        </Submenu> -->
        <Submenu name="4">
          <template slot="title">
            <Icon type="md-apps" />更多
          </template>
          <MenuItem name="about">关于我们</MenuItem>
          <MenuItem name="questions">常见问题</MenuItem>
          <MenuItem name="contact">联系我们</MenuItem>
        </Submenu>
      </Menu>
      <span class="user-btn">
        <Button
          v-if="this.$store.state.user.type === 0"
          type="primary" icon="ios-paper-outline"
          shape="circle"
          to="/create-resume"
        >完善简历</Button>
        <Button
          v-if="this.$store.state.user.type === 1"
          type="primary"
          icon="ios-paper-plane"
          shape="circle"
          to="/post-jobs"
        >发布职位</Button>
      </span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </header>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  props: {
    tabName: {
      default: 'home'
    }
  },
  data() {
    return {
      hideTop: false,
      modal1: false
    };
  },
  created() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.hideTop = true;
      } else {
        this.hideTop = false;
      }
    });
  },
  methods: {
    handleSelect(name) {
      if (!this.$store.state.user.userId) {
        this.$router.history.push('/login');
        return;
      }
      if (name === 'home'){
        this.$router.history.push('/');
        return;
      }
      this.$router.history.push('/' + name)
    },
    exit(){
      Cookie.remove('userId');
      const router = this.$router
      this.$store.commit('user/removeUser');
      this.$Modal.success({
        title: '退出成功',
        width: 300,
        onOk() {
          router.history.push('/')
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/common/head.less";
</style>
