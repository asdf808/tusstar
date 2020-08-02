
export default [
  {
    path: '/company-list',
    name: '企业列表页',
    component: () => import(/* webpackChunkName: "CompanyList" */ '../views/company/CompanyList.vue'),
    meta: {
      title: '企业列表',
      keepAlive: true,
      auth: 1
    }
  },
  {
    path: '/company-detail/:cid',
    name: '企业详情页',
    component: () => import(/* webpackChunkName: "CompanyDetail" */ '../views/company/CompanyDetail.vue'),
    meta: {
      title: '企业详情页',
      keepAlive: false,
      auth: 1
    }
  },
  {
    path: '/company-center',
    name: '企业中心页',
    component: () => import(/* webpackChunkName: "CompanyCenter" */ '../views/company/CompanyCenter.vue'),
    meta: {
      title: '企业中心',
      keepAlive: false,
      auth: 3
    }
  },
  {
    path: '/modify-information',
    name: '企业信息修改',
    component: () => import(/* webpackChunkName: "ModifyInformation" */ '../views/company/ModifyInformation.vue'),
    meta: {
      title: '企业信息修改',
      keepAlive: false,
      auth: 3
    }
  },
  {
    path: '/post-jobs',
    name: '发布职位页',
    component: () => import(/* webpackChunkName: "PostJobs" */ '../views/company/PostJobs.vue'),
    meta: {
      title: '发布职位',
      keepAlive: false,
      auth: 3
    }
  }
]
