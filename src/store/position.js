import axios from "axios";
import store from "@/store/index";

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL_TEST,
    }
);
$axios.defaults.headers.common['content_language'] = "en";
const state = {
    positionId: "",
}

const getters = {}
const mutations = {
    SET_POSITION_ID(state, payload) {
        return state.positionId = payload;
    }
}
const actions = {
    fetchPosition({state}, position_id) {
        return new Promise((resolve, reject) => {
            $axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
            $axios.get(`position/${state.positionId || position_id}`).then((res) => {
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
