import axios from "axios";
import store from "@/store/index";

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,

    }
);
$axios.defaults.headers.common['content_language'] = "en";
const state = {
    logoId: "",
}

const getters = {}
const mutations = {
    SET_LOGO_ITEM(state, payload) {
        return state.logoId = payload;
    }
}

const actions = {
    fetchLogoItem({state}, logo_id) {
        return new Promise((resolve, reject) => {
            $axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
            $axios.get(`siteInfo/${state.logoId || logo_id}`).then((res) => {
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
