import Vue from 'vue'
import Vuex from 'vuex'
import PostProvider from '@/resources/posts_provider'
const postService = new PostProvider()

Vue.use(Vuex)
const state= {
  roleDialog:false,
  post:[],
  res:[]
}

const mutations= {
  IncrementRole(state){
    state.roleDialog = !state.roleDialog;
  },

  SET_POST(state,data){
    state.post = data;
  },

  SET_RES(state,data){
    state.res = data;
  }

}

const getters={
  post:state => state.post,
  res:state => state.res
}

const actions= {


  async getPost ({commit}) {
    const data = await postService.getPost()
    console.log(data)
    commit('SET_POST', data)
  },
  async createPost({commit},{title,body,userId}){

    console.log(title)
    console.log(body)
    console.log(userId)
    // console.log(datum[0].userId)
    const data = await postService.createPost(title,body,userId)
    commit('SET_RES',data)
  }
}

const modules= {
}

export default new Vuex.Store({
  modules,
  state,
  getters,
  actions,
  mutations

})
