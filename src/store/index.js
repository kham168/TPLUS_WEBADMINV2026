import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleDialog:false,
  },
  mutations: {
    IncrementRole(state){
      state.roleDialog = !state.roleDialog;
    }
  },
  actions: {
  },
  modules: {
  }
})
