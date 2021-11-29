import axios from "axios";
import store from "@/store/index";

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,
    }
);
$axios.defaults.headers.common['content_language'] = "en";
const state = {
    permission_id: "",
}
const mutations = {
    SET_PERMISSION_ID(state, payload) {
        return state.permission_id = payload;
    }
}
const actions = {
    fetchPermission({state}, permission_id) {
        return new Promise((resolve, reject) => {
            $axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
            $axios.get(`permissions/${state.permission_id || permission_id}`).then((res) => {
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
