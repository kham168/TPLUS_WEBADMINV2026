import Vue from 'vue'
import Vuex from 'vuex'
import PostProvider from '@/resources/posts_provider'
import User from "@/store/User";
const postService = new PostProvider()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleDialog:false,
    modalNotificationSuccess:{
      type:'success',
      snackbar:false,
      message:''
    },
    modalNotificationError:{
      type:'error',
      snackbar:false,
      message:''
    },
    modalNotificationWarning:{
      type:'warning',
      snackbar:false,
      message:''
    },
    post:{},
    res:{}
  },
  mutations: {
    IncrementRole(state){
      state.roleDialog = !state.roleDialog;
    },

    SET_NOTIFICATION_SUCCESS(state,message){
      state.modalNotificationSuccess.snackbar=true;
      state.modalNotificationSuccess.message=message.message;
    },
    SET_NOTIFICATION_ERROR(state,message){
      state.modalNotificationError.snackbar=true;
      state.modalNotificationError.message=message;
    },
    SET_NOTIFICATION_WARNING(state,message){
      state.modalNotificationWarning.snackbar=true;
      state.modalNotificationWarning.message=message;
    },

    SET_POST(state,data){
      state.post = data;
    },

    SET_RES(state,data){
      state.res = data;
    }
 
  },
  actions: {
    action_Notifi_Success({commit},{message}){
     commit('SET_NOTIFICATION_SUCCESS',{message});
    },
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
    User,
  }
})
