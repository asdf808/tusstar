<template>
  <div class="footer">
    <div class="continer">
        <div class="info">
          <img src="../../assets/images/logo-light.png" alt="">
          <p>启迪之星自1999年清华科技园孵化器成立起，累计投资100多个初创企业，投资总额超过1亿元 人民币，其中投资项目的地 方基金覆盖东北，华中，东部等地区，重点关注互联网+、TMT、 节能环保、新材料、生物医 药、先进制造、教育培训、 智能+、现代服务、大消费等 领域。</p>
        </div>
        <div class="info">
          <h3>启迪导航</h3>
          <ul>
            <li v-for="(item,index) in navs" :key="index">
              <a :href="item.link">
                <Icon type="ios-arrow-forward" />
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
        <div class="info">
          <h3>功能</h3>
          <ul>
            <li v-for="(item,index) in funs" :key="index">
              <a :href="item.link">
                <Icon type="ios-arrow-forward" />
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
        <div class="info">
          <h3>关于我们</h3>
          <ul>
            <li>启迪之星(青海)分公司</li>
            <li>青海省西宁市城北区</li>
            <li>qidizhixing@xxx.com</li>
          </ul>
        </div>
      </div>
      <Divider />
      <p class="copy-right">
        © 2019 启迪之星(青海). Design by <a href="https://www.qhu.edu.cn/">青海大学</a>.
      </p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navs: [
        { text: '启迪之星', link: 'http://www.tusstar.com/' },
        { text: '启迪天使投资', link: 'http://invest.tusstar.com/' },
        { text: '启迪之星(青海)', link: '/' }
      ],
      funs: [
        { text: '启迪之星', link: 'http://www.tusstar.com/' },
        { text: '启迪天使投资', link: 'http://invest.tusstar.com/' },
        { text: '启迪之星(青海)', link: '/' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/common/footer.less';
</style>
