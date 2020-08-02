
export default [
  {
    path: '/job-list',
    name: '职位列表',
    component: () => import(/* webpackChunkName: "job-list" */ '../views/job/JobList.vue'),
    meta: {
      title: '职位列表',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '/job-detail/:jobid',
    name: '职位详情',
    component: () => import(/* webpackChunkName: "job-detail" */ '../views/job/JobDetail.vue'),
    meta: {
      title: '职位详情',
      auth: 1,
      keepAlive: false
    }
  },
  {
    path: '/job-apply/:jobId',
    name: '职位申请情况',
    component: () => import(/* webpackChunkName: "job-detail" */ '../views/job/JobApply.vue'),
    meta: {
      title: '职位申请情况',
      auth: 3,
      keepAlive: false
    }
  }
]
