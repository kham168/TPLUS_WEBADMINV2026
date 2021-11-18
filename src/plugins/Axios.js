import Vue from 'vue'
import Axios from 'axios'

export const $axios = Axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,
    }
);

export const $http = Axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_ADDRESS,
    }
);

Vue.prototype.$axios = $axios;
Vue.prototype.$http = $http;