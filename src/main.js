import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "../src/assets/scss/main.scss";
import i18n from './i18n'
import validate from "./Validation/validate"
import "../src/plugins/Axios"
import ModalDelete from "@/components/Modals/modalDelete"
import ModalAdd from "@/components/Modals/modalAdd"
import ModalShow from "@/components/Modals/modalShow"
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
// import VueSocketIO from 'vue-socket.io'
//
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://25.10.235.85:7000',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     // options: { path: "/my-app/" } //Optional options
// }))


Vue.config.productionTip = false
Vue.prototype.$myValidator = validate;
Vue.component('ModalDelete', ModalDelete)
Vue.component('ModalAdd', ModalAdd)
Vue.component('ModalShow', ModalShow)
Vue.filter('numFormat', numFormat(numeral));
Vue.use(require('vue-moment'));
new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
