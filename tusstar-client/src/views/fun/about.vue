<template>
  <div>
    <nav-bar tabName="about">
      <h2 style="font-size: 25px;">关于我们</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 功能
        <Icon type="ios-arrow-forward" /> 关于我们
      </p>
    </nav-bar>
    <div class="about">
      <div class="img">
        <img src="@/assets/images/about.jpg"
             alt="">
      </div>
      <div class="info">
        <h1>关于启迪之星</h1>
        <p>“启迪之星”前身是成立于1999年的清华创业园，是科技部火炬中心认定的首批国家级孵化器，确立了“孵化+投资”的发展模式和专业孵化器的发展方向，在全球建立孵化基地140多个，拥有创新孵化面积近20万平方米,是国内线下覆盖网络最全的创业孵化器，并建成第一个中美跨境孵化器以及香港最大孵化器。</p>
        <p>2001年被科技部评定为国家高新技术创业服务中心、国家高新区先进孵化机构，2007年被中关村管委会、海淀区政府评为中关村科技园区产、学、研合作示范基地，2012年被北京市经信委评为北京市小企业创业基地，被北京市组织部、人社局、科委评为优秀留学人员创业园，曾获荷兰科学联盟组织的全球科技孵化器评选的“科学孵化器最佳实践奖”。先后获选国际科技园协会发布的“2014-IASP孵化器最佳实践奖”和投中集团评选的“2014中国孵化器TOP10”，被中关村天使投资协会评为“2014年度中关村优秀创业服务机构”, 2015年被工信部评定为首批国家小型微型企业创业创新示范基地，被科技部评定为首批国家级众创空间，截至2018年启迪之星共运营国家级孵化器3个，国家级小微基地2个，国家级众创空间12个。</p>
        <p>启迪之星通过整合创新资源，搭建创业平台，与园区企业共同成长，已累计孵化服务企业超5000家，培育了大批优秀企业，其中“钻石企业”69家，“金种子工程”企业95家，已有35家企业成功上市。</p>
        <Button size="large"
                shape="circle"
                type="primary"
                style="margin-top:20px;float: right"
                to="http://www.tusstar.com/index.php?app=web&a=detail&id=2388"
                target="_blank">
          了解更多
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.about {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  align-items: center;
  margin: 50px auto;
  .img {
    width: 40%;
    img {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .info {
    flex: 1;
    padding-left: 40px;
    p {
      text-indent: 32px;
      margin-top: 12px;
      font-size: 16px;
      color: #888;
    }
    @media (max-width: 768px) {
      padding-left: 0;
    }
  }
}
</style>
