import axios from "axios";
import store from "@/store/index";

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL_TEST,
    }
);
$axios.defaults.headers.common['content_language'] = "en";
const state = {
    user_id: "",
}

const getters = {}
const mutations = {
    SET_USER_ID(state, payload) {
        return state.user_id = payload;
    }
}
const actions = {
    fetchUser({state}, user_id) {
        return new Promise((resolve, reject) => {
            $axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
            $axios.get(`users-roles-permissions/${state.user_id || user_id}`).then((res) => {
                if (res.status === 200) {
                    resolve(res)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
