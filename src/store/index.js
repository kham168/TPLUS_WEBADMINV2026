import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/store/User";
import Post from "@/store/Posts/Post"
import CatePost from "@/store/Posts/CatePost"
import DataPackage from "@/store/Packages/DataPackage"
import CateDataPackage from "@/store/Packages/CateDataPackage"
import Banner from "@/store/Banner"
import Contact from "@/store/Contact"
import Product from "@/store/Products/Product.js"
import CateProduct from "@/store/Products/CateProduct.js"

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

  

   
 
  },
  actions: {
    action_Notifi_Success({commit},{message}){
     commit('SET_NOTIFICATION_SUCCESS',{message});
    },
    
  

  
  },

  getters:{

  },

  modules: {
    User,
    Post,
    CatePost,
    DataPackage,
    CateDataPackage,
    Banner,
    Contact,
    Product,
    CateProduct,
  }
})