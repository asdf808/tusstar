export default [
  {
    path: '/',
    name: '首页',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      title: '启迪之星人才招聘',
      auth: 0, // 访问限制 0:无需登录 1:任意用户 2:学生用户 3:企业用户
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/about',
    name: '关于我们',
    component: () => import(/* webpackChunkName: "about" */ '../views/fun/about.vue'),
    meta: {
      title: '关于我们',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '/questions',
    name: '常见问题',
    component: () => import(/* webpackChunkName: "questions" */ '../views/fun/questions.vue'),
    meta: {
      title: '常见问题',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '/contact',
    name: '联系我们',
    component: () => import(/* webpackChunkName: "contact" */ '../views/contact.vue'),
    meta: {
      title: '联系我们',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import(/* webpackChunkName: "403" */ '../views/error/403.vue'),
    meta: {
      title: '403 Forbidden',
      auth: 0,
      keepAlive: false
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '../views/error/404.vue'),
    meta: {
      title: '404 Not Found',
      auth: 0,
      keepAlive: false
    }
  }
]
