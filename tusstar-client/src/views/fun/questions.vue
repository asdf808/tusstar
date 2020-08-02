<template>
  <div>
    <nav-bar tabName="questions">
      <h2 style="font-size: 25px;">F.A.Q</h2>
      <br>
      <p>
        主页
        <Icon type="ios-arrow-forward" /> 功能
        <Icon type="ios-arrow-forward" /> 常见问题
      </p>
    </nav-bar>
    <div class="questions">
      <h1>求职者问题</h1>
      <ul>
        <li v-for="(item,index) in jobseekerQuestions" :key="index">
          <div class="question" @click="handleClick1(index)">
            {{ item.question }}
            <span class="array" :style="curIndex1 === index ? {transform: 'rotate(-180deg)'} : ''"><Icon type="ios-arrow-down" /></span>
          </div>
          <div class="ans-box" :style="{height: curIndex1 === index ? curHeight1 + 'px' : 0}">
            <div class="ans" ref="jobseekerQuestion">{{ item.ans }}</div>
          </div>
        </li>
      </ul>
      <h1 style="margin-top:50px">雇主企业问题</h1>
      <ul>
        <li v-for="(item,index) in bossQuestions" :key="index">
          <div class="question" @click="handleClick2(index)">
            {{ item.question }}
            <span class="array" :style="curIndex1 === index ? {transform: 'rotate(-180deg)'} : ''"><Icon type="ios-arrow-down" /></span>
          </div>
          <div class="ans-box" :style="{height: curIndex2 === index ? curHeight2 + 'px' : 0}">
            <div class="ans" ref="bossQuestions">{{ item.ans }}</div>
          </div>
        </li>
      </ul>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobseekerQuestions: [
        {
          question: '怎样添加简历',
          ans: '首先注册一个账号，成为本站会员，然后在应聘者功能中新建一份属于自己的简历。'
        },
        {
          question: '怎样投递简历?',
          ans: '在建立了属于自己的简历之后，在企业栏里面选择你心仪的公司投递就可以啦！'
        },
        {
          question: '怎样让自己的简历更容易被接受? ',
          ans: '将你的简历所有选填项都填满，同时在附加栏里面将你的获奖信息都写上。'
        },
        {
          question: '接到面试通知后应该怎么办? ',
          ans: '认真准备应聘岗位需要用到的知识，并且复习简历上设计到的知识。'
        },
        {
          question: '着重注意哪些问题? ',
          ans: '注意时间观念以及自己的言行举止！'
        }
      ],
      bossQuestions: [
        {
          question: '怎样发布一个岗位?',
          ans: '注册一个账号成为本站会员，点击发布岗位。'
        },
        {
          question: '在启迪之星在线招聘应注意什么问题?',
          ans: '要注意填写真实的企业信息，本站管理者会进行核实。'
        },
        {
          question: '怎样能找到更多的求职者?',
          ans: '将贵公司的福利待遇工作地点以及工作内容都写清楚哦。'
        }
      ],
      curIndex1: -1,
      curIndex2: -1,
      curHeight1: 0,
      curHeight2: 0
    }
  },
  methods: {
    handleClick1(index) {
      if (index === this.curIndex1){
        this.curIndex1 = -1;
      } else {
        this.curHeight1 = this.$refs.jobseekerQuestion[index].offsetHeight;
        this.curIndex1 = index;
      }
    },
    handleClick2(index) {
      if (index === this.curIndex2){
        this.curIndex2 = -1;
      } else {
        this.curHeight2 = this.$refs.bossQuestions[index].offsetHeight;
        this.curIndex2 = index;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .questions {
    width: 80%;
    margin: 80px auto;
    ul li {
      border: 1px #ccc solid;
      border-radius: 10px;
      background: #f8f9fc;
      margin-top: 15px;
      box-shadow: -1px -1px 5px #ccc;
      cursor: pointer;
      .question {
        padding: 14px 20px;
        font-size: 18px;
        font-weight: 600;
        .array {
          float: right;
          transition: .4s;
        }
      }
      .ans-box {
        overflow: hidden;
        transition: .4s;
      }
      .hide-ans{
        height: 0;
        transition: height .4s;
      }
      .ans {
        font-size: 16px;
        color: #aaa;
        background: #fff;
        padding: 15px
      }
    }
  }
</style>
