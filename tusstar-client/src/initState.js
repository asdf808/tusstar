import Cookie from 'js-cookie';
export default function (store){
  // 在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', JSON.stringify(store.state))
  })
  // 在页面加载时读取sessionStorage里的状态信息
  if (sessionStorage.getItem('store')) {
    store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
  } else if (Cookie.get('userId')) {
    console.log("store.dispatch('user/getUser');");
    store.dispatch('user/getUser');
  }
}
