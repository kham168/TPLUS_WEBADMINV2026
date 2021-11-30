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

Vue.config.productionTip = false
Vue.prototype.$myValidator = validate;
Vue.component('ModalDelete', ModalDelete)
Vue.component('ModalAdd', ModalAdd)
Vue.component('ModalShow', ModalShow)
new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
