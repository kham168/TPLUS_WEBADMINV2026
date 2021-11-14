import Vue from 'vue'
import Vuex from 'vuex'
import PostProvider from '@/resources/posts_provider'
const postService = new PostProvider()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleDialog:false,
    post:{},
    res:{}
  },
  mutations: {
    IncrementRole(state){
      state.roleDialog = !state.roleDialog;
    },

    SET_POST(state,data){
      state.post = data;
    },

    SET_RES(state,data){
      state.res = data;
    }
 
  },
  actions: {
    async getPost ({commit}) {
      const data = await postService.getPost()
      commit('SET_POST', data)
    },

    async createPost({commit},datum){
      console.log(datum)
      console.log(datum[0].title)
      console.log(datum[0].body)
      console.log(datum[0].userId)
      const data = await postService.createPost(datum[0].title,datum[0].body,datum[0].userId)
      commit('SET_RES',data)
    }
  },
  modules: {
  }
})
