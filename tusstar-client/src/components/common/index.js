import NavBar from './NavBar.vue';
import FooterBar from './FooterBar.vue';

export default {
  install(Vue) {
    Vue.component('NavBar', NavBar);
    Vue.component('FooterBar', FooterBar)
  }
}
