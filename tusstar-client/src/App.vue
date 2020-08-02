<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import Cookie from 'js-cookie'
export default {
  created() {
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }
    // else if (Cookie.get('userId')){
    //   this.$store.dispatch('user/getUser');
    // }
  }
}
</script>
<style lang="less">
</style>
