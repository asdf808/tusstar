import Vue from 'vue'
import VueRouter from 'vue-router'
import constRouters from './constRouters';
import registAndLoginRouters from './registAndLoginRouters';
import jobRouters from './jobRouters';
import companyRouters from './companyRouters';
import studentRouters from './studentRouters';
import routeCheckFunction from './routeCheckFunction';

Vue.use(VueRouter)

const routes = [
  ...constRouters,
  ...registAndLoginRouters,
  ...jobRouters,
  ...companyRouters,
  ...studentRouters
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(routeCheckFunction);

export default router
