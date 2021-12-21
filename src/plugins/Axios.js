import Vue from 'vue';
import axios from 'axios';
import store from '../store'
import router from "../router/index"

if (store.getters['User/isAuth']) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['User/getToken'];
    axios.defaults.headers.common['content_language'] = localStorage.getItem('lang') || localStorage.setItem('lang', "la");
}

export const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,
    }
);
export const $http = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_ADDRESS,
    }
);

$axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status == 401) {
        store.dispatch("User/destroyToken");
        router.push({name: 'Login'})
    }

    // if (error.response.status == 403) {
    //     router.push({ name: 'Login' })
    // }

    return Promise.reject(error);
});

Vue.prototype.$axios = $axios;
Vue.prototype.$http = $http;
