<template>
   <div class="all">
     <back-home></back-home>
      <Row type="flex">
          <!-- 第一部分 -->
            <Col :xs="4" :sm="24" :md="6" :lg="1">
            <div style="height:100%;background:#0F75BD;border-right:3px #bbb solid; margin:0px 5px"></div>
            </Col>
            <!-- 第二部分 -->
             <Col :xs="5" :sm="16" :md="12" :lg="7">
                <div class="mod">
                    <Row class="mod1">
                            <Col :xs="2" :sm="8" :md="8" :lg="24" style="text-align:center;">
                            <p class="head" ><img :src="this.$store.state.imgurl.imgurl + resume.img.substring(7, resume.img.length)" alt=""></p>
                            </Col>
                            <Col :xs="20" :sm="8" :md="8" :lg="24">
                            <h2  style="text-align:center;padding-right: 70px;">{{resume.name}}</h2>
                            </Col>
                    </Row>
                    <Row class="mod2">
                            <I-Col :xs="2" :sm="4" :md="6" :lg="8">
                                 <h3><Icon type="ios-call" /><span></span>联系方式</h3>
                            </I-Col>
                            <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                 <h4><Icon type="md-phone-portrait" /><span></span>手机号: {{resume.phone}}</h4>
                            </I-Col>
                            <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                 <h4><Icon type="md-mail" /><span></span>邮箱: {{resume.email}}</h4>
                            </I-Col>
                  </Row>
                  <Row class="mod3">
                            <I-Col :xs="2" :sm="4" :md="6" :lg="15">
                                 <h3><Icon type="md-pin" /><span></span>常住地址</h3>
                            </I-Col>
                            <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                 <h4><span></span>{{resume.address}}</h4></I-Col>
                  </Row>
                </div>
            </Col>
              <!-- /第三部分 -->
              <Col :xs="5" :sm="16" :md="12" :lg="15">
                <div class="las">
                            <Row class="las1">
                                  <I-Col :xs="2" :sm="4" :md="6" :lg="8">
                                       <h2><span></span>基本信息</h2>
                                  </I-Col>
                                  <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                    <Row>
                                      <Col :xs="12" :sm="12" :md="12" :lg="12">
                                          <h4><span></span>毕业院校：{{resume.school}}</h4>
                                      </Col>
                                      <Col :xs="12" :sm="12" :md="12" :lg="12">
                                          <h4>专业：{{resume.major}}</h4>
                                      </Col>
                                    </Row>
                                      <Row>
                                        <Col :xs="2" :sm="4" :md="6" :lg="8">
                                            <h4><span></span>性别：{{resume.sex}}</h4>
                                        </Col>
                                        <Col :xs="20" :sm="16" :md="12" :lg="8">
                                            <h4>年龄：{{resume.age}}</h4>
                                        </Col>
                                        <Col :xs="2" :sm="4" :md="6" :lg="8">
                                            <h4> 民族：{{resume.nation}}</h4>
                                        </Col>
                                      </Row>
                                        <Row>
                                          <Col :xs="2" :sm="4" :md="6" :lg="8">
                                                <h4><span></span>入学时间: {{ dateFormat(resume.admissionTime) }}</h4>
                                            </Col>
                                            <Col :xs="20" :sm="16" :md="12" :lg="8">
                                                <h4>学制: {{resume.xuezhi}}</h4>
                                            </Col>
                                            <Col :xs="2" :sm="4" :md="6" :lg="8">
                                                <h4>学历: {{resume.xueli}}</h4>
                                          </Col>
                                        </Row>
                                    </I-Col>
                          </Row>

                           <Row class="las2">
                                  <I-Col :xs="2" :sm="4" :md="6" :lg="8">
                                        <h2><span></span>工作/实习/项目经历</h2>
                                  </I-Col>
                                  <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                         <div><span></span>{{resume.work}}</div>
                                  </I-Col>
                          </Row>

                          <Row class="las3">
                                  <I-Col :xs="2" :sm="4" :md="6" :lg="8">
                                       <h2><span></span>奖惩情况</h2>
                                  </I-Col>
                                  <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                       <div><span></span>{{resume.attach}}</div>
                                  </I-Col>
                          </Row>

                          <Row class="las4">
                                  <I-Col :xs="2" :sm="4" :md="6" :lg="8">
                                        <h2><span></span>自我介绍</h2>
                                  </I-Col>
                                  <I-Col :xs="20" :sm="16" :md="12" :lg="8">
                                         <div><span></span>{{resume.intor}}</div>
                                  </I-Col>
                          </Row>
                 </div>
              </Col>
         </Row>
   </div>
</template>
<script>
import BackHome from '@/components/common/BackHome'
export default {
  components: {
    BackHome
  },
  data(){
    return {
      resume: {}
    }
  },
  async mounted(){
    const { data: res } = await this.$axios.get(`/resume/getResume/${this.$route.params.studentId}`);
    if (res.code === 1){
      this.resume = res.data;
    }
  },
  methods: {
    dateFormat(time){
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + '-' + month + '-' + day;
    }
  }
}
</script>
<style lang="less" scoped>
     @import "../../assets/css/fun/resume-model.less";
</style>
