import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/font/font.css'
import './assets/css/main.less'
import Common from './components/common';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map'
import initState from './initState';

// axios.defaults.baseURL="http://192.168.1.1:5000";
Vue.use(Common)
Vue.use(BaiduMap, {
  ak: 'UXMDbkyBc12X9MK3uVfN1cKpGer7sOhw'
})
Vue.use(ViewUI)

initState(store);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

axios.defaults.baseURL = '/api';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
