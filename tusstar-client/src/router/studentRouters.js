export default [
  {
    path: '/create-resume',
    name: 'create-resume',
    component: () => import(/* webpackChunkName: "createResume" */ '../views/fun/createResume.vue'),
    meta: {
      title: '完善简历',
      auth: 2,
      keepAlive: true
    }
  },
  {
    path: '/complete-personal',
    name: 'complete-personal',
    component: () => import(/* webpackChunkName: "CompletePersonal" */ '../views/authentication/CompletePersonal.vue'),
    meta: {
      title: '修改个人信息',
      auth: 2,
      keepAlive: true
    }
  },
  {
    path: '/resume-model/:studentId',
    name: '简历查看',
    component: () => import(/* webpackChunkName: "ResumeModel" */ '../views/authentication/ResumeModel.vue'),
    meta: {
      title: '简历模板',
      auth: 2,
      keepAlive: true
    }
  },
  {
    path: '/personal-center',
    name: '个人中心',
    component: () => import(/* webpackChunkName: "personalCenter" */ '../views/PersonalCenter.vue'),
    meta: {
      title: '个人中心',
      auth: 2,
      keepAlive: false
    }
  }
]
