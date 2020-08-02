export default [
  {
    path: '/login',
    name: '登录页面',
    component: () => import(/* webpackChunkName: "login" */ '../views/authentication/login.vue'),
    meta: {
      title: '登录',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '/modify-password',
    name: 'modify-password',
    component: () => import(/* webpackChunkName: "ModifyPassword" */ '../views/authentication/ModifyPassword.vue'),
    meta: {
      title: '修改密码',
      auth: 3,
      keepAlive: false
    }
  },
  {
    path: '/company-regist',
    name: 'CompanyRegist',
    component: () => import(/* webpackChunkName: "CompanyRegist" */ '../views/authentication/CompanyRegist.vue'),
    meta: {
      title: '企业注册',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '/find-password',
    name: 'find-password',
    component: () => import(/* webpackChunkName: "findPassword" */ '../views/authentication/FindPassword.vue'),
    meta: {
      title: '找回密码',
      auth: 0,
      keepAlive: false
    }
  }
]
