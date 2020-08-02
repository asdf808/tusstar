import axios from 'axios'

const initState = {
}

const state = () => ({
  ...initState
})

const mutations = {
  setUser(state, payload) {
    state.userId = payload._id;
    state.username = payload.username;
    state.type = payload.type;
    if (payload.type === 0){
      state.student = payload.student;
    }
    if (payload.type === 1){
      state.company = payload.company;
    }
  },
  removeUser(state){
    state.userId = null;
    state.username = null;
    state.type = null;
    state.userInfo = null;
  }
}
const actions = {
  async getUser({ commit }) {
    const { data: response } = await axios.get('/users/getUser');
    if (response.code === 1){
      commit('setUser', response.data)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
