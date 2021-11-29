import axios from "axios";
import store from "@/store/index";

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,
    }
);
$axios.defaults.headers.common['content_language'] = "en";
const state = {
    role_id: "",
}
const mutations = {
    SET_ROLE_ID(state, payload) {
        return state.role_id = payload;
    }
}
const actions = {
    fetchRole({state}, role_id) {
        return new Promise((resolve, reject) => {
            $axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
            $axios.get(`roles/${state.role_id || role_id}`).then((res) => {
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
    mutations,
    actions
}
