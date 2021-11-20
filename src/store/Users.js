import axios from 'axios'
import store from "./index"

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,
    }
);

const state ={
    //for fatch data 
    users:[],
    // for edit
    user_item:[]
};

const getters={

};

const mutations ={

};

const actions={

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}